var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
const rowsPerColumn = 15;
const lessonsNumber = Object.keys(lessons_json).length;

var lessons_checks = [];


document.addEventListener("DOMContentLoaded", (event) => {

    for (let i = 0; i < lessonsNumber; ++i) {
        lessons_checks.push(false);
    }

    lessons_checks[0] = true;

    restart();
});

function changeLesson(lesson_index) {
    lessons_checks[lesson_index - 1] = !lessons_checks[lesson_index - 1];
}

function calculateWordsArray() {
    let words = [];

    for (let index = 0; index < lessons_checks.length; ++index) {
        if (lessons_checks[index]) { words = words.concat(lessons_json["lesson" + (index + 1)]); }
    }

    return words;
}

function startLessons() {

    document.getElementById("main").innerHTML = `
    <div id="cards" class="cards">
        <div class="element_container">
            <p id="char_element" class="char_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>
        <div class="input_container">
            <tag>Roman syllable:</tag>
            <input id="latin_input" type="text"></input></div>
        <div class="button_container">
            <button id="next_button" onclick="next()">Next</button>
        </div>
    </div>`;

    document.getElementById("latin_input").addEventListener("keypress", function (event) {
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
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
}

function next() {
    let input = document.getElementById("latin_input").value;

    if (!Array.isArray(shuffled[actualIndex].latin) && input.toUpperCase() == shuffled[actualIndex].latin.toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("latin_input").placeholder = "";
    } else if (Array.isArray(shuffled[actualIndex].latin) && shuffled[actualIndex].latin.some(e => e.toUpperCase() === input.toUpperCase())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("latin_input").placeholder = "";
    } else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        document.getElementById("latin_input").value = "";
        document.getElementById("latin_input").placeholder = shuffled[actualIndex].latin; // Show correct answer
    }

    if (++actualIndex < shuffled.length) {
        document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
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
        <button id="return" onclick="window.location.href = '/kaado/index.html'">Return to index</button>
    </div>
    <table id="answers_table" class="answers_table">
        <caption>Incorrect answers</caption>
    </table>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    if (incorrectCount != 0) {
        let table = "";
        table += "<tbody>";
        for (let i = 0; i < incorrectIndexes.length; i += Math.ceil(incorrectIndexes.length / rowsPerColumn)) {
            table += "<tr>";
            for (let j = i; j < i + Math.ceil(incorrectIndexes.length / rowsPerColumn); ++j) {
                if (j < incorrectIndexes.length)
                    table += "<td>" + shuffled[incorrectIndexes[j]].latin + " : " + shuffled[incorrectIndexes[j]].japanese + "</td>";
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

    for (let i = 1; i <= lessonsNumber; ++i) {
        text += `<div>
                    <input type="checkbox" id="` + i + `" name="` + i + `" ` + (lessons_checks[i - 1] ? `checked` : `false`) + ` onchange="changeLesson(` + i + `)">
                    <label for="` + i + `">Lesson ` + i + `</label><br>
                </div>`
    }

    text += `</div>`;

    document.getElementById("main").innerHTML = text;
}