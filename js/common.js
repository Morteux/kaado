const MAX_ROWS_PER_COLUMN = 15;

const CARD_HTML =`
    <div id="cards" class="cards">

        <div class="element_container">
            <p id="char_element" class="char_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>

        <div class="input_container">
            <tag>Latin syllable:</tag>
            <input id="latin_input" type="text"></input>
        </div>

        <div id="correct_answer_container" class="input_container">
            <span>Correct answer: </span><span id="correct_answer"></span>
        </div>

        <div class="button_container">
            <button id="next_button" onclick="next()">Next</button>
        </div>

    </div>`;


var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];

var category_checks = [];

function startTest() {
    // Reset all variables
    shuffled = [];
    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectIndexes = [];
    
    category_checks = []; // ???????????

    // Print initial card template
    document.getElementById("main").innerHTML = CARD_HTML;

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
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].kana;
}

function next() {
    let input = document.getElementById("latin_input").value;

    // Check for single string
    if (!Array.isArray(shuffled[actualIndex].latin) && input.toUpperCase().trim() == shuffled[actualIndex].latin.toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    } 

    // Check for array of strings
    else if (Array.isArray(shuffled[actualIndex].latin) && shuffled[actualIndex].latin.some(e => e.toUpperCase() === input.toUpperCase().trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    }
    // If not, it is incorrect
    else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        document.getElementById("latin_input").value = "";
        document.getElementById("correct_answer_container").style.display = "";
        document.getElementById("correct_answer").innerHTML = shuffled[actualIndex].latin; // Show correct answer
    }

    if (++actualIndex < shuffled.length) {
        document.getElementById("char_element").innerHTML = shuffled[actualIndex].kana;
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
                    table += "<td>" + shuffled[incorrectIndexes[j]].latin + " : " + shuffled[incorrectIndexes[j]].kana + "</td>";
            }
            table += "</tr>";
        }
        table += "</tbody>";

        document.getElementById("answers_table").innerHTML += table;
    } else {
        document.getElementById("answers_table").getElementsByTagName("caption")[0].innerHTML = "PERFECT!";
    }
}