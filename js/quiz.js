// Common variables
var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];

// Search Kanji on Jisho.org when clicked
function addSearchKanjiOnClickFeature() {
    let allTds = document.querySelectorAll('td');

    allTds.forEach(function (tdElement) {
        allTds = document.querySelectorAll('td');
        tdElement.addEventListener('click', function () {
            let kanji = tdElement.innerText;
            let jishoUrl = 'https://jisho.org/search/' + encodeURIComponent(kanji) + '%23kanji';
            window.open(jishoUrl, '_blank');
        });

        tdElement.style.cursor = 'pointer';
    });
}

// Initialization function
function commonInitialize() {
    addSearchKanjiOnClickFeature();

    startTest();
}

function showStrokeButton() {
    document.getElementById("question_element").classList.toggle("question_show_strokes");
}

function switchQuestionAnswer() {
    let aux = config.question_key;
    config.question_key = config.answer_key;
    config.answer_key = aux;

    document.getElementById("switch_question_answer").innerHTML = `Question:&nbsp` + config.question_key + `<br>Answer:&nbsp` + config.answer_key;
}

function startTest() {
    // Reset all variables
    shuffled = Object.keys(kanji_list).sort((a, b) => 0.5 - Math.random());
    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectIndexes = [];

    // Initialize IME input
    var input = document.getElementById('card_input');
    wanakana.bind(input);

    // Add event listener to input for Enter key
    document.getElementById("card_input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("next_button").click();
        }
    });

    if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
        config.question_key = "kanji";
        config.answer_key = "readings_on";
    } else {
        config.question_key = "kana";
        config.answer_key = "roumaji";
    }

    document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]][config.question_key];

    document.getElementById("total_counter").innerHTML = shuffled.length;

    // Show strokes by default
    if (config.show_strokes_by_default) {
        showStrokeButton();
    }
}

function next() {
    let input = document.getElementById("card_input").value;
    let correctAnswers = kanji_list[shuffled[actualIndex]][config.answer_key];
    if (!Array.isArray(correctAnswers)) {
        correctAnswers = [correctAnswers];
    }

    // If correct
    if (correctAnswers.some(e => e === input.trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
    }

    // If incorrect
    else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
    }

    // Show correct answer
    if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
        document.getElementById("correct_answer_question").innerHTML = shuffled[actualIndex];
        document.getElementById("correct_answer_kun").innerHTML = kanji_list[shuffled[actualIndex]]["readings_kun"].join("、");
        document.getElementById("correct_answer_on").innerHTML = kanji_list[shuffled[actualIndex]]["readings_on"].join("、");
        document.getElementById("correct_answer_meanings").innerHTML = kanji_list[shuffled[actualIndex]]["meanings"].join(", ");
    } else {
        document.getElementById("correct_answer_question").innerHTML = shuffled[actualIndex];
        document.getElementById("correct_answer_kun").innerHTML = kanji_list[shuffled[actualIndex]]["roumaji"];
    }

    // Next question
    document.getElementById("card_input").value = "";

    if (++actualIndex < shuffled.length) {
        document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]][config.question_key];

        if (kanji_list[shuffled[actualIndex]].hasOwnProperty("answer_tag")) {
            document.getElementById("answer_tag").innerHTML = kanji_list[shuffled[actualIndex]]["answer_tag"] + ": ";
        }

        document.getElementById("actual_counter").innerHTML = actualIndex;
    } else {
        startEnd();
    }
}

function startEnd() {
    document.getElementById("quiz_content").classList.toggle("hidden");
    document.getElementById("end_content").classList.toggle("hidden");

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    if (incorrectCount != 0) {
        let table = "";

        for (let i = 0; i < incorrectIndexes.length; ++i) {
            if (Array.isArray(shuffled[incorrectIndexes[i]][config.answer_key])) {
                table += `<div class="incorrect_data">` + shuffled[incorrectIndexes[i]][config.answer_key].join(", ") + `&nbsp:&nbsp`;
            } else {
                table += `<div class="incorrect_data">` + shuffled[incorrectIndexes[i]][config.answer_key] + `&nbsp:&nbsp`;
            }

            if (Array.isArray(shuffled[incorrectIndexes[i]][config.question_key])) {
                table += shuffled[incorrectIndexes[i]][config.question_key].join(", ") + `</div>`;
            } else {
                table += shuffled[incorrectIndexes[i]][config.question_key] + `</div>`;
            }
        }

        document.getElementById("answers_table").innerHTML += table;
    } else {
        document.getElementById("answers_title").innerHTML = "PERFECT!";
    }
}