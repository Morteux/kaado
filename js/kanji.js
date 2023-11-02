var kanji_lesson_1 = true;  // Default
var kanji_lesson_2 = false;
var kanji_lesson_3 = false;




// function changeKanjiLesson1() {
//     kanji_lesson_1 = !kanji_lesson_1;
// }

// function changeKanjiLesson2() {
//     kanji_lesson_2 = !kanji_lesson_2;
// }

// function changeKanjiLesson3() {
//     kanji_lesson_3 = !kanji_lesson_3;
// }




// function calculateWordsArray() {
//     let words = [];
    
//     if( kanji_lesson_1 ) { words = words.concat(dictionary.kanji_lesson_1); }
//     if( kanji_lesson_2 ) { words = words.concat(dictionary.kanji_lesson_2); }
//     if( kanji_lesson_3 ) { words = words.concat(dictionary.kanji_lesson_3); }

//     return words;
// }









var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
const rowsPerColumn = 15;
const checksNumber = Object.keys(dictionary).length;

var kanji_checks = [];


document.addEventListener("DOMContentLoaded", (event) => {

    for (let i = 0; i < checksNumber; ++i) {
        kanji_checks.push(false);
    }

    kanji_checks[0] = true;

    restart();
});

function changeKanjiLesson(lesson_index) {
    kanji_checks[lesson_index - 1] = !kanji_checks[lesson_index - 1];
}

function calculateWordsArray() {
    let words = [];

    for (let index = 0; index < kanji_checks.length; ++index) {
        if (kanji_checks[index]) { words = words.concat(dictionary["kanji_lesson_" + (index + 1)]); }
    }

    return words;
}

function startSyllables() {

    document.getElementById("main").innerHTML = `
    <div id="cards" class="cards">
        <div class="element_container">
            <p id="char_element" class="char_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>
        <div class="input_container">
            <tag id="yomi_tag"></tag>
            <input id="kana_input" type="text"></input></div>
        <div class="button_container">
            <button id="next_button" onclick="next()">Next</button>
        </div>
    </div>`;

    document.getElementById("kana_input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("next_button").click();
        }
    });

    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectIndexes = [];

    shuffled = calculateWordsArray().sort((a, b) => 0.5 - Math.random());
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].kanji;
    document.getElementById("yomi_tag").innerHTML = shuffled[actualIndex].yomi + ": ";
}

function next() {
    let input = document.getElementById("kana_input").value;

    if (!Array.isArray(shuffled[actualIndex].kana) && input.toUpperCase() == shuffled[actualIndex].kana.toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("kana_input").value = "";
        document.getElementById("kana_input").placeholder = "";
    } else if (Array.isArray(shuffled[actualIndex].kana) && shuffled[actualIndex].kana.some(e => e.toUpperCase() === input.toUpperCase())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("kana_input").value = "";
        document.getElementById("kana_input").placeholder = "";
    } else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        document.getElementById("kana_input").value = "";
        document.getElementById("kana_input").placeholder = shuffled[actualIndex].kana; // Show correct answer
    }

    if (++actualIndex < shuffled.length) {
        document.getElementById("char_element").innerHTML = shuffled[actualIndex].kanji;
        
        document.getElementById("yomi_tag").innerHTML = shuffled[actualIndex].yomi + ": ";
    } else {
        startEnd();
    }
}

function startEnd() {
    document.getElementById("main").innerHTML = `
    <div class="results_container">
        <div><img src="images/correct.png" alt="Correct icon" width="50" height="50"> <p id="correctCounter">0</p></div>
        <div><img src="images/incorrect.png" alt="Incorrect icon" width="50" height="50"> <p id="incorrectCounter">0</p></div>
        <button id="restart" onclick="restart()">Restart</button>
    </div>
    <table id="answers_table" class="answers_table">
        <caption>Incorrect answers</caption>
    </table>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    if(incorrectCount != 0) {
        let table = "";
        table += "<tbody>";
        for(let i = 0; i < incorrectIndexes.length; i += Math.ceil(incorrectIndexes.length / rowsPerColumn)) {
            table += "<tr>";
            for(let j = i; j < i + Math.ceil(incorrectIndexes.length / rowsPerColumn); ++j) {
                if(j < incorrectIndexes.length)
                    table += "<td>" + shuffled[incorrectIndexes[j]].kana + " : " + shuffled[incorrectIndexes[j]].kanji + "</td>";
            }
            table += "</tr>";
        }
        table += "</tbody>";

        document.getElementById("answers_table").innerHTML += table;
    } else {
        document.getElementById("answers_table").getElementsByTagName("caption")[0].innerHTML = "PERFECT!";
    }
}

function restart() {

    let text = `
    <button class="start_button" onclick="startLessons()">Start lesson test</button>
    <div class="checkboxes_container">`;

    for (let i = 1; i <= checksNumber; ++i) {
        text += `<div>
                    <input type="checkbox" id="kanji_lesson_` + i + `" name="kanji_lesson_` + i + `" ` + (kanji_lesson[i - 1] ? `checked` : `false`) + ` onchange="changeKanjiLesson(` + i + `)">
                    <label for="kanji_lesson_` + i + `">Kanji Lesson ` + i + `</label><br>
                </div>`;
    }

    text += `</div>`;

    document.getElementById("main").innerHTML = text;
}