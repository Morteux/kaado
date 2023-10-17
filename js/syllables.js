var hiragana = true;    // Default
var hiragana_tenten = false;
var hiragana_maru = false;
var hiragana_diptongo = false;
var hiragana_diptongo_tenten = false;
var hiragana_diptongo_maru = false;

var katakana = false;
var katakana_tenten = false;
var katakana_maru = false;
var katakana_diptongo = false;
var katakana_diptongo_tenten = false;
var katakana_diptongo_maru = false;
var katakana_extra = false;

function changeHiragana() {
    hiragana = !hiragana;
}

function changeHiraganaTenten() {
    hiragana_tenten = !hiragana_tenten;
}

function changeHiraganaMaru() {
    hiragana_maru = !hiragana_maru;
}

function changeHiraganaDiptongo() {
    hiragana_diptongo = !hiragana_diptongo;
}

function changeHiraganaDiptongoTenten() {
    hiragana_diptongo_tenten = !hiragana_diptongo_tenten;
}

function changeHiraganaDiptongoMaru() {
    hiragana_diptongo_maru = !hiragana_diptongo_maru;
}



function changeKatakana() {
    katakana = !katakana;
}

function changeKatakanaTenten() {
    katakana_tenten = !katakana_tenten;
}

function changeKatakanaMaru() {
    katakana_maru = !katakana_maru;
}

function changeKatakanaDiptongo() {
    katakana_diptongo = !katakana_diptongo;
}

function changeKatakanaDiptongoTenten() {
    katakana_diptongo_tenten = !katakana_diptongo_tenten;
}

function changeKatakanaDiptongoMaru() {
    katakana_diptongo_maru = !katakana_diptongo_maru;
}

function changeKatakanaExtra() {
    katakana_extra = !katakana_extra;
}




function calculateWordsArray() {
    let words = [];

    if( hiragana ) { words = words.concat(dictionary.hiragana); }
    if( hiragana_tenten ) { words = words.concat(dictionary.hiragana_tenten); }
    if( hiragana_maru ) { words = words.concat(dictionary.hiragana_maru); }
    if( hiragana_diptongo ) { words = words.concat(dictionary.hiragana_diptongo); }
    if( hiragana_diptongo_tenten ) { words = words.concat(dictionary.hiragana_diptongo_tenten); }
    if( hiragana_diptongo_maru ) { words = words.concat(dictionary.hiragana_diptongo_maru); }

    if( katakana ) { words = words.concat(dictionary.katakana); }
    if( katakana_tenten ) { words = words.concat(dictionary.katakana_tenten); }
    if( katakana_maru ) { words = words.concat(dictionary.katakana_maru); }
    if( katakana_diptongo ) { words = words.concat(dictionary.katakana_diptongo); }
    if( katakana_diptongo_tenten ) { words = words.concat(dictionary.katakana_diptongo_tenten); }
    if( katakana_diptongo_maru ) { words = words.concat(dictionary.katakana_diptongo_maru); }
    if( katakana_extra ) { words = words.concat(dictionary.katakana_extra); }

    return words;
}









var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];
const rowsPerColumn = 15;

function startSyllables() {

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
    <button class="start_button" onclick="startSyllables()">Start syllables test</button>
    <div class="checkboxes_container">
        <div>
            <input type="checkbox" id="hiragana" name="hiragana" ` + (hiragana ? `checked` : `false`) + ` onchange="changeHiragana()">
            <label for="hiragana">Hiragana</label><br>
        </div>
        <div>
            <input type="checkbox" id="hiragana_tenten" name="hiragana_tenten" ` + (hiragana_tenten ? `checked` : `false`) + ` onchange="changeHiraganaTenten()">
            <label for="hiragana_tenten">Hiragana Tenten</label><br>
        </div>
        <div>
            <input type="checkbox" id="hiragana_maru" name="hiragana_maru" ` + (hiragana_maru ? `checked` : `false`) + ` onchange="changeHiraganaMaru()">
            <label for="hiragana_maru">Hiragana Maru</label><br>
        </div>
        <div>
            <input type="checkbox" id="hiragana_diptongo" name="hiragana_diptongo" ` + (hiragana_diptongo ? `checked` : `false`) + ` onchange="changeHiraganaDiptongo()">
            <label for="hiragana_diptongo">Hiragana Diptongo</label><br>
        </div>
        <div>
            <input type="checkbox" id="hiragana_diptongo_tenten" name="hiragana_diptongo_tenten" ` + (hiragana_diptongo_tenten ? `checked` : `false`) + ` onchange="changeHiraganaDiptongoTenten()">
            <label for="hiragana_diptongo_tenten">Hiragana Diptongo Tenten</label><br>
        </div>
        <div>
            <input type="checkbox" id="hiragana_diptongo_maru" name="hiragana_diptongo_maru" ` + (hiragana_diptongo_maru ? `checked` : `false`) + ` onchange="changeHiraganaDiptongoMaru()">
            <label for="hiragana_diptongo_maru">Hiragana Diptongo Maru</label><br>
        </div>


        <br>
        

        <div>
            <input type="checkbox" id="katakana" name="katakana" ` + (katakana ? `checked` : `false`) + ` onchange="changeKatakana()">
            <label for="katakana">Katakana</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_tenten" name="katakana_tenten" ` + (katakana_tenten ? `checked` : `false`) + ` onchange="changeKatakanaTenten()">
            <label for="katakana_tenten">Katakana Tenten</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_maru" name="katakana_maru" ` + (katakana_maru ? `checked` : `false`) + ` onchange="changeKatakanaMaru()">
            <label for="katakana_maru">Katakana Maru</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_diptongo" name="katakana_diptongo" ` + (katakana_diptongo ? `checked` : `false`) + ` onchange="changeKatakanaDiptongo()">
            <label for="katakana_diptongo">Katakana Diptongo</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_diptongo_tenten" name="katakana_diptongo_tenten" ` + (katakana_diptongo_tenten ? `checked` : `false`) + ` onchange="changeKatakanaDiptongoTenten()">
            <label for="katakana_diptongo_tenten">Katakana Diptongo Tenten</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_diptongo_maru" name="katakana_diptongo_maru" ` + (katakana_diptongo_maru ? `checked` : `false`) + ` onchange="changeKatakanaDiptongoMaru()">
            <label for="katakana_diptongo_maru">Katakana Diptongo Maru</label><br>
        </div>
        <div>
            <input type="checkbox" id="katakana_extra" name="katakana_extra" ` + (katakana_extra ? `checked` : `false`) + ` onchange="changeKatakanaExtra()">
            <label for="katakana_extra">Katakana Extra</label><br>
        </div>
    </div>`;
}