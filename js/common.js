// Const variables
const MAX_ROWS_PER_COLUMN = 15;

const CARD_HTML = `
    <div id="cards" class="cards">

        <div class="floating_button">
            <button id="show_stroke_button" name="button" onclick="showStrokeButton()">Show stroke</button>
        </div>

        <div class="counter_container">
            <div id="actual_counter">0</div>
            &nbsp/&nbsp
            <div id="total_counter"></div>
        </div>

        <div class="element_container">
            <p id="question_element" class="question_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>

        <div class="input_container">
            <tag id="answer_tag">Answer:</tag>
            <input id="card_input" type="text"></input>
        </div>

        <div id="correct_answer_container" class="input_container" style="display:none;">
            <span>Correct answer:&nbsp;</span><span id="correct_answer"></span>
        </div>

        <div class="button_container">
            <button class="primary_button" onclick="location.reload();">Exit</button>
            <button id="next_button" class="primary_button" onclick="next()">Next</button>
        </div>

    </div>`;



// Read only variables
var CHECKS_LENGTH;
var JSON_KEYS;



// Common variables
var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
var category_checks = [];



// Extra functions 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatCategoryName(category_name) {
    return capitalizeFirstLetter(category_name.replaceAll("_", " "));
}



// Common functions
document.addEventListener("DOMContentLoaded", (event) => {
    CHECKS_LENGTH = Object.keys(JSON_DATA).length;
    JSON_KEYS = Object.keys(JSON_DATA);

    // Initialize category_checks
    for (let i = 0; i < CHECKS_LENGTH; ++i) {
        category_checks.push(false);
    }

    // Last category check by default
    category_checks[CHECKS_LENGTH - 1] = true;

    restart();
});

function showStrokeButton() {
    let question_element = document.getElementById("question_element");
    let show_stroke_button = document.getElementById("show_stroke_button");

    if (question_element.classList.contains("question_show_strokes")) {
        question_element.classList.remove("question_show_strokes");
        show_stroke_button.innerHTML = "Show stroke";
    } else {
        question_element.classList.add("question_show_strokes");
        show_stroke_button.innerHTML = "Hide stroke";
    }
}

function switchQuestionAnswer() {
    let aux = question_key;
    question_key = answer_key;
    answer_key = aux;

    document.getElementById("switch_question_answer").innerHTML = `Question:&nbsp` + question_key + `<br>Answer:&nbsp` + answer_key;
}

function changeCategory(category_index) {
    category_checks[category_index] = !category_checks[category_index];
}

function calculateWordsArray() {
    let words = [];

    for (let index = 0; index < category_checks.length; ++index) {
        if (category_checks[index]) { words = words.concat(JSON_DATA[JSON_KEYS[index]]); }
    }

    return words;
}

function startTest() {
    // Reset all variables
    shuffled = [];
    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectIndexes = [];

    // Print initial card template
    document.getElementById("content").innerHTML = CARD_HTML;

    document.getElementById("card_input").addEventListener("keypress", function (event) {
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

    if (Array.isArray(shuffled[actualIndex][question_key])) {
        document.getElementById("question_element").innerHTML = shuffled[actualIndex][question_key].join("<br>");
    } else {
        document.getElementById("question_element").innerHTML = shuffled[actualIndex][question_key];
    }
    document.getElementById("total_counter").innerHTML = shuffled.length;

    if (shuffled[actualIndex].hasOwnProperty(answer_tag)) {
        document.getElementById("answer_tag").innerHTML = shuffled[actualIndex][answer_tag] + ": ";
    }

    // Show strokes by default
    if (show_strokes_by_default) {
        showStrokeButton();
    }
}

function next() {
    let input = document.getElementById("card_input").value;

    // Check for single string
    if (!Array.isArray(shuffled[actualIndex][answer_key]) && input.toUpperCase().trim() == shuffled[actualIndex][answer_key].toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("card_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    }

    // Check for array of strings
    else if (Array.isArray(shuffled[actualIndex][answer_key]) && shuffled[actualIndex][answer_key].some(e => e.toUpperCase() === input.toUpperCase().trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("card_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    }

    // If not, it is incorrect
    else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        document.getElementById("card_input").value = "";
        document.getElementById("correct_answer_container").style.display = "";

        if (Array.isArray(shuffled[actualIndex][answer_key])) {
            document.getElementById("correct_answer").innerHTML = shuffled[actualIndex][answer_key].join(", "); // Show correct answer
        } else {
            document.getElementById("correct_answer").innerHTML = shuffled[actualIndex][answer_key]; // Show correct answer
        }
    }

    if (++actualIndex < shuffled.length) {
        if (Array.isArray(shuffled[actualIndex][question_key])) {
            document.getElementById("question_element").innerHTML = shuffled[actualIndex][question_key].join(", ");
        } else {
            document.getElementById("question_element").innerHTML = shuffled[actualIndex][question_key];
        }

        if (shuffled[actualIndex].hasOwnProperty(answer_tag)) {
            document.getElementById("answer_tag").innerHTML = shuffled[actualIndex][answer_tag] + ": ";
        }

        document.getElementById("actual_counter").innerHTML = actualIndex;
    } else {
        startEnd();
    }
}

function startEnd() {
    document.getElementById("content").innerHTML = `
        <div class="end_container">
            <div class="results_container">
                <div>
                    <div class="answers_counter">
                        <img src="images/correct.png" alt="Correct icon" width="50" height="50"> <p id="correctCounter">0</p>
                    </div>
                    <div class="answers_counter">
                        <img src="images/incorrect.png" alt="Incorrect icon" width="50" height="50"> <p id="incorrectCounter">0</p>
                    </div>
                </div>
                <div>
                    <button id="restart" onclick="restart()">Restart</button>
                    <button id="return" onclick="window.location.href = '/kaado'">Return to index</button>
                </div>
            </div>
            <div class="answers_container">
                <div id="answers_title" class="answers_title">Incorrect answers</div>
                <div id="answers_table" class="answers_table">
                
                </div>
            </div>
        </div>
    `;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    if (incorrectCount != 0) {
        let table = "";

        for (let i = 0; i < incorrectIndexes.length; ++i) {
            if (Array.isArray(shuffled[incorrectIndexes[i]][answer_key])) {
                table += `<div class="incorrect_data">` + shuffled[incorrectIndexes[i]][answer_key].join(", ") + `&nbsp:&nbsp`;
            } else {
                table += `<div class="incorrect_data">` + shuffled[incorrectIndexes[i]][answer_key] + `&nbsp:&nbsp`;
            }

            if (Array.isArray(shuffled[incorrectIndexes[i]][question_key])) {
                table += shuffled[incorrectIndexes[i]][question_key].join(", ") + `</div>`;
            } else {
                table += shuffled[incorrectIndexes[i]][question_key] + `</div>`;
            }
        }

        document.getElementById("answers_table").innerHTML += table;
    } else {
        document.getElementById("answers_title").innerHTML = "PERFECT!";
    }
}

function restart() {

    let text = `
        <div class="button_column_container">
            <button class="primary_button" onclick="startTest()">Start test</button>
            <button id="switch_question_answer" class="primary_button" onclick="switchQuestionAnswer()">Question:&nbsp` + question_key + `<br>Answer:&nbsp` + answer_key + `</button>
            <button class="primary_button" onclick="window.location.href = '/kaado'">Return to index</button>
        </div>

        <div class="checkboxes_container">
    `;

    for (let i = 0; i < CHECKS_LENGTH; ++i) {
        text += `<div>
                    <input type="checkbox" id="` + i + `" name="` + i + `" ` + (category_checks[i] ? `checked` : `false`) + ` onchange="changeCategory(` + i + `)">
                    <label for="` + i + `">` + formatCategoryName(JSON_KEYS[i]) + `</label><br>
                </div>`;
    }

    text += `</div>`;

    document.getElementById("content").innerHTML = text;
}