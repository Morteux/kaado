// var hiragana = new Map();

// hiragana.get("a", "あ");
// hiragana.get("i", "い");
// hiragana.get("u", "う");
// hiragana.get("e", "え");
// hiragana.get("o", "お");
// hiragana.get("ka", "か");
// hiragana.get("ki", "き");
// hiragana.get("ku", "く");
// hiragana.get("ke", "け");
// hiragana.get("ko", "こ");
// hiragana.get("sa", "さ");
// hiragana.get("shi", "し");
// hiragana.get("su", "す");
// hiragana.get("se", "せ");
// hiragana.get("so", "そ");
// hiragana.get("ta", "た");
// hiragana.get("chi", "ち");
// hiragana.get("tsu", "つ");
// hiragana.get("te", "て");
// hiragana.get("to", "と");
// hiragana.get("na", "な");
// hiragana.get("ni", "に");
// hiragana.get("nu", "ぬ");
// hiragana.get("ne", "ね");
// hiragana.get("no", "の");
// hiragana.get("ha", "は");
// hiragana.get("hi", "ひ");
// hiragana.get("fu", "ふ");
// hiragana.get("he", "へ");
// hiragana.get("ho", "ほ");
// hiragana.get("ma", "ま");
// hiragana.get("mi", "み");
// hiragana.get("mu", "む");
// hiragana.get("me", "め");
// hiragana.get("mo", "も");

// hiragana.get("a", "");
// hiragana.get("i", "");
// hiragana.get("u", "");
// hiragana.get("e", "");
// hiragana.get("o", "");



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
var correctCount = 24;
var incorrectCount = 3;

function startTest() {
    // document.getElementById("start_button").display = "none";

    document.getElementById("main").innerHTML = `
    <div id="cards" class="cards">
        <div id="element_container">
            <p id="element" class="element">あ</p>
        </div>
        <div><input id="latin_input" type="text"></input></div>
        <div>
            <button id="siguiente" onclick="siguiente()">Siguiente</button>
            <button id="resolver" onclick="resolver()">Resolver</button>
        </div>
    </div>`;

    // for (var key in dictionary.hiragana) {
    //     console.log(dictionary.hiragana[key].latin + " : " + dictionary.hiragana[key].japanese);
    // }

    shuffled = dictionary.hiragana.sort((a, b) => 0.5 - Math.random());
    
    // console.log(shuffled);
}

function siguiente() {
    let input = document.getElementById("latin_input").value;

    if(input == shuffled[actualIndex].latin)
    {
        ++correctCount;
    }

    if(++actualIndex < shuffled.length) {
        document.getElementById("element").innerHTML = shuffled[actualIndex].japanese;
    } else {
        document.getElementById("element").innerHTML = "FIN";
        document.getElementById("siguiente").disabled = true;
        document.getElementById("resolver").disabled = true;
        startEnd();
    }
}

function startEnd() {
    
    document.getElementById("main").innerHTML = `
    <div id="results" class="results">
        <div><img src="images/correct.png" alt="Correct icon" width="50" height="50"><p id="correctCounter">0</p></div>
        <div><img src="images/incorrect.png" alt="Incorrect icon" width="50" height="50"><p id="incorrectCounter">0</p></div>
    </div>`;

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;
}