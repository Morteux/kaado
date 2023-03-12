var dictionary = {
    "comidas": [
        { "latin": "comidas", "japanese": "たべもの" },
        { "latin": "arroz", "japanese": "ごはん" },
        { "latin": "pan", "japanese": "パン" },
        { "latin": "pescado", "japanese": "さかな" },
        { "latin": "carne", "japanese": "にく" },
        { "latin": "carne de pollo", "japanese": "とりにく" },
        { "latin": "carne de vaca", "japanese": "ぎゅうにく" },
        { "latin": "carne de cerdo", "japanese": "ぶたにく" },
        { "latin": "jamón serrano", "japanese": "なまハム" },
        { "latin": "huevo", "japanese": "たまご" },
        { "latin": "verdura", "japanese": "やさい" },
        { "latin": "tomate", "japanese": "トマト" },
        { "latin": "pepino", "japanese": "きゅうり" },
        { "latin": "repollo", "japanese": "キャベツ" },
        { "latin": "patata", "japanese": "じゃがいも" },
        { "latin": "zanahoria", "japanese": "にんじん" },
        { "latin": "fruta", "japanese": "くだもの" },
        { "latin": "banana", "japanese": "バナナ" },
        { "latin": "sandia", "japanese": "すいか" },
        { "latin": "mandarina", "japanese": "みかん" },
        { "latin": "manzana", "japanese": "りんご" },
        { "latin": "uva", "japanese": "ぶどう" },
        { "latin": "fresa", "japanese": "いちご" },
        { "latin": "melón", "japanese": "メロン" },
        { "latin": "melocotón", "japanese": "もも" },
        { "latin": "sushi", "japanese": "すし" },
        { "latin": "ramen", "japanese": "ラーメン" },
        { "latin": "sashimi", "japanese": "さしみ" },
        { "latin": "takoyaki", "japanese": "たこやき" },
        { "latin": "pasta", "japanese": "パスタ" },
        { "latin": "pizza", "japanese": "ピザ" },
        { "latin": "sándwich", "japanese": "サンドイッチ" },
        { "latin": "ensalada", "japanese": "サラダ" },
        { "latin": "dulces", "japanese": "おかし" },
        { "latin": "caramelo", "japanese": "あめ" },
        { "latin": "chocolate", "japanese": "チョコレート" },
        { "latin": "tarta", "japanese": "ケーキ" },
        { "latin": "galleta", "japanese": "クッキー" },
        { "latin": "patatas fritas en bolsa", "japanese": "ポテトチップス" },
        { "latin": "chicle", "japanese": "ガム" }
    ],


    "kanji": [
    ]
};

var comidas = false;

function changeComidas() {
    comidas = !comidas;
}

function calculateWordsArray() {
    let words = [];

    if( comidas ) { words = words.concat(dictionary.comidas); }

    return words;
}









var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
const rowsPerColumn = 15;

function startDictionary() {

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

    if (input.toUpperCase() == shuffled[actualIndex].latin.toUpperCase()) {
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
    document.getElementById("main").innerHTML = `
    <button class="start_button" onclick="startDictionary()">Start dictionary test</button>
    <div class="checkboxes_container">
        <div>
            <input type="checkbox" id="comidas" name="comidas" ` + (comidas ? `checked` : `false`) + ` onchange="changeComidas()">
            <label for="comidas">Comidas</label><br>
        </div>
    </div>`;
}