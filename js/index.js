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
        { "latin": "mo", "japanese": "も" }
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

function startTest() {

    document.getElementById("main").innerHTML = `
    <div id="cards" class="cards">
        <div id="element_container">
            <p id="char_element" class="char_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>
        <div><tag>Roman syllable: </tag><input id="latin_input" type="text"></input></div>
        <div>
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

    shuffled = dictionary.hiragana.sort((a, b) => 0.5 - Math.random());
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
}

function next() {
    let input = document.getElementById("latin_input").value;

    if (input == shuffled[actualIndex].latin) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
    } else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
        showCorrectAnswer();
    }

    if (++actualIndex < shuffled.length) {
        document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
    } else {
        startEnd();
    }
}

function showCorrectAnswer() {
    document.getElementById("latin_input").value = shuffled[actualIndex].latin;
}

function startEnd() {
    document.getElementById("main").innerHTML = `
    <div id="results" class="results">
        <div><img src="images/correct.png" alt="Correct icon" width="50" height="50"><p id="correctCounter">0</p></div>
        <div><img src="images/incorrect.png" alt="Incorrect icon" width="50" height="50"><p id="incorrectCounter">0</p></div>
        <button id="restart" onclick="startTest()">Restart</button>
    </div>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;
}