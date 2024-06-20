const CHECKS_LENGTH = Object.keys(dictionary).length;


document.addEventListener("DOMContentLoaded", (event) => {

    for (let i = 0; i < CHECKS_LENGTH; ++i) {
        category_checks.push(false);
    }

    category_checks[0] = true;

    restart();
});

function changeKanjiLesson(lesson_index) {
    category_checks[lesson_index - 1] = !category_checks[lesson_index - 1];
}

function calculateWordsArray() {
    let words = [];

    for (let index = 0; index < category_checks.length; ++index) {
        if (category_checks[index]) { words = words.concat(dictionary["kanji_lesson_" + (index + 1)]); }
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
            <input id="kana_input" type="text"></input>
        </div>
        <div id="correct_answer_container" class="input_container">
            <span>Correct answer: </span><span id="correct_answer"></span>
        </div>
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

    if (!Array.isArray(shuffled[actualIndex].kana) && input.toUpperCase().trim() == shuffled[actualIndex].kana.toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("kana_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    } else if (Array.isArray(shuffled[actualIndex].kana) && shuffled[actualIndex].kana.some(e => e.toUpperCase() === input.toUpperCase().trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("kana_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    } else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        document.getElementById("kana_input").value = "";
        document.getElementById("correct_answer_container").style.display = "";
        document.getElementById("correct_answer").innerHTML = shuffled[actualIndex].kana; // Show correct answer
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
        <button id="return" onclick="window.location.href = '/index.html'">Return to index</button>
    </div>
    <table id="answers_table" class="answers_table">
        <caption>Incorrect answers</caption>
    </table>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    if (incorrectCount != 0) {
        let table = "";
        table += "<tbody>";
        for (let i = 0; i < incorrectIndexes.length; i += Math.ceil(incorrectIndexes.length / MAX_ROWS_PER_COLUMN)) {
            table += "<tr>";
            for (let j = i; j < i + Math.ceil(incorrectIndexes.length / MAX_ROWS_PER_COLUMN); ++j) {
                if (j < incorrectIndexes.length)
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
    <button class="start_button" onclick="startSyllables()">Start test</button>
    <div class="checkboxes_container">`;

    for (let i = 1; i <= CHECKS_LENGTH; ++i) {
        text += `<div>
                    <input type="checkbox" id="kanji_lesson_` + i + `" name="kanji_lesson_` + i + `" ` + (category_checks[i - 1] ? `checked` : `false`) + ` onchange="changeKanjiLesson(` + i + `)">
                    <label for="kanji_lesson_` + i + `">Kanji Lesson ` + i + `</label><br>
                </div>`;
    }

    text += `</div>`;

    document.getElementById("main").innerHTML = text;
}