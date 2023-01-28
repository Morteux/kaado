var dictionary = {
    "hiragana": [
        { "latin": "a", "japanese": "あ" },
        { "latin": "i", "japanese": "い" },
        { "latin": "u", "japanese": "う" },
        { "latin": "e", "japanese": "え" },
        { "latin": "o", "japanese": "お" },

        { "latin": "ka", "japanese": "か" },
        { "latin": "ki", "japanese": "き" },
        { "latin": "ku", "japanese": "く" },
        { "latin": "ke", "japanese": "け" },
        { "latin": "ko", "japanese": "こ" },

        { "latin": "sa", "japanese": "さ" },
        { "latin": "shi", "japanese": "し" },
        { "latin": "su", "japanese": "す" },
        { "latin": "se", "japanese": "せ" },
        { "latin": "so", "japanese": "そ" },

        { "latin": "ta", "japanese": "た" },
        { "latin": "chi", "japanese": "ち" },
        { "latin": "tsu", "japanese": "つ" },
        { "latin": "te", "japanese": "て" },
        { "latin": "to", "japanese": "と" },

        { "latin": "na", "japanese": "な" },
        { "latin": "ni", "japanese": "に" },
        { "latin": "nu", "japanese": "ぬ" },
        { "latin": "ne", "japanese": "ね" },
        { "latin": "no", "japanese": "の" },

        { "latin": "ha", "japanese": "は" },
        { "latin": "hi", "japanese": "ひ" },
        { "latin": "fu", "japanese": "ふ" },
        { "latin": "he", "japanese": "へ" },
        { "latin": "ho", "japanese": "ほ" },

        { "latin": "ma", "japanese": "ま" },
        { "latin": "mi", "japanese": "み" },
        { "latin": "mu", "japanese": "む" },
        { "latin": "me", "japanese": "め" },
        { "latin": "mo", "japanese": "も" },

        { "latin": "ya", "japanese": "や" },
        { "latin": "yu", "japanese": "ゆ" },
        { "latin": "yo", "japanese": "よ" },

        { "latin": "ra", "japanese": "ら" },
        { "latin": "ri", "japanese": "り" },
        { "latin": "ru", "japanese": "る" },
        { "latin": "re", "japanese": "れ" },
        { "latin": "ro", "japanese": "ろ" },

        { "latin": "wa", "japanese": "わ" },
        { "latin": "o", "japanese": "を" },
        { "latin": "n", "japanese": "ん" },

        { "latin": "ga", "japanese": "が" },
        { "latin": "gi", "japanese": "ぎ" },
        { "latin": "gu", "japanese": "ぐ" },
        { "latin": "ge", "japanese": "げ" },
        { "latin": "go", "japanese": "ご" },

        { "latin": "za", "japanese": "ざ" },
        { "latin": "ji", "japanese": "じ" },
        { "latin": "zu", "japanese": "ず" },
        { "latin": "ze", "japanese": "ぜ" },
        { "latin": "zo", "japanese": "ぞ" },

        { "latin": "da", "japanese": "だ" },
        { "latin": "ji", "japanese": "ぢ" },
        { "latin": "zu", "japanese": "づ" },
        { "latin": "de", "japanese": "で" },
        { "latin": "do", "japanese": "ど" },

        { "latin": "ba", "japanese": "ば" },
        { "latin": "bi", "japanese": "び" },
        { "latin": "bu", "japanese": "ぶ" },
        { "latin": "be", "japanese": "べ" },
        { "latin": "bo", "japanese": "ぼ" },

        { "latin": "pa", "japanese": "ぱ" },
        { "latin": "pi", "japanese": "ぴ" },
        { "latin": "pu", "japanese": "ぷ" },
        { "latin": "pe", "japanese": "ぺ" },
        { "latin": "po", "japanese": "ぽ" }
    ],
    "katakana": [
    ],
    "kanji": [
    ]
};

var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
const rowsPerColumn = 15;

function startTest() {

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

    shuffled = dictionary.hiragana.sort((a, b) => 0.5 - Math.random());
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
}

function next() {
    let input = document.getElementById("latin_input").value;

    if (input == shuffled[actualIndex].latin) {
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
        <button id="restart" onclick="startTest()">Restart</button>
    </div>
    <table id="answers_table" class="answers_table">
        <caption>Incorrect answers</caption>
    </table>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    let table = "";
    table += "<tbody>";
    for(let i = 0; i < incorrectIndexes.length; i += Math.ceil(incorrectIndexes.length / rowsPerColumn)) {
        table += "<tr>";
        for(let j = i; j < i + Math.ceil(incorrectIndexes.length / rowsPerColumn); ++j) {
            if(j < incorrectIndexes.length)
                table += "<td>" + shuffled[incorrectIndexes[j]].latin + " : " + shuffled[incorrectIndexes[j]].japanese + "</td>";
        }
        table += "</tr>";
    }
    table += "</tbody>";

    document.getElementById("answers_table").innerHTML += table;
}