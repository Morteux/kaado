var comidas = false;
var bebidas = false;
var semana = false;
var adverbiosTemporales = false;
var paises = false;
var profesiones = false;
var personas = false;
var cosas = false;
var lugares = false;
var vehiculos = false;
var verbos = false;

function changeComidas() {
    comidas = !comidas;
}

function changeBebidas() {
    bebidas = !bebidas;
}

function changeSemana() {
    semana = !semana;
}

function changeAdverbiosTemporales() {
    adverbiosTemporales = !adverbiosTemporales;
}

function changePaises() {
    paises = !paises;
}

function changeProfesiones() {
    profesiones = !profesiones;
}

function changePersonas() {
    personas = !personas;
}

function changeCosas() {
    cosas = !cosas;
}

function changeLugares() {
    lugares = !lugares;
}

function changeVehiculos() {
    vehiculos = !vehiculos;
}

function changeVerbos() {
    verbos = !verbos;
}

function calculateWordsArray() {
    let words = [];

    if( comidas ) { words = words.concat(dictionary.comidas); }
    if( bebidas ) { words = words.concat(dictionary.bebidas); }
    if( semana ) { words = words.concat(dictionary.semana); }
    if( adverbiosTemporales ) { words = words.concat(dictionary.adverbiosTemporales); }
    if( paises ) { words = words.concat(dictionary.paises); }
    if( profesiones ) { words = words.concat(dictionary.profesiones); }
    if( personas ) { words = words.concat(dictionary.personas); }
    if( cosas ) { words = words.concat(dictionary.cosas); }
    if( lugares ) { words = words.concat(dictionary.lugares); }
    if( vehiculos ) { words = words.concat(dictionary.vehiculos); }
    if( verbos ) { words = words.concat(dictionary.verbos); }
    
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

    if (!Array.isArray(shuffled[actualIndex].latin) && input.toUpperCase().trim() == shuffled[actualIndex].latin.toUpperCase()) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    } else if (Array.isArray(shuffled[actualIndex].latin) && shuffled[actualIndex].latin.some(e => e.toUpperCase() === input.toUpperCase().trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
        document.getElementById("latin_input").value = "";
        document.getElementById("correct_answer").innerHTML = "";
        document.getElementById("correct_answer_container").style.display = "none";
    } else {
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

function restart() {
    document.getElementById("main").innerHTML = `
    <button class="start_button" onclick="startDictionary()">Start dictionary test</button>
    <div class="checkboxes_container">
        <div>
            <input type="checkbox" id="comidas" name="comidas" ` + (comidas ? `checked` : `false`) + ` onchange="changeComidas()">
            <label for="comidas">Comidas</label><br>
        </div>
        <div>
            <input type="checkbox" id="bebidas" name="bebidas" ` + (bebidas ? `checked` : `false`) + ` onchange="changeBebidas()">
            <label for="bebidas">Bebidas</label><br>
        </div>
        <div>
            <input type="checkbox" id="semana" name="semana" ` + (semana ? `checked` : `false`) + ` onchange="changeSemana()">
            <label for="semana">D&iacute;as de la semana</label><br>
        </div>
        <div>
            <input type="checkbox" id="adverbiosTemporales" name="adverbiosTemporales" ` + (adverbiosTemporales ? `checked` : `false`) + ` onchange="changeAdverbiosTemporales()">
            <label for="adverbiosTemporales">Adverbios Temporales</label><br>
        </div>
        <div>
            <input type="checkbox" id="paises" name="paises" ` + (paises ? `checked` : `false`) + ` onchange="changePaises()">
            <label for="paises">Pa&iacute;ses</label><br>
        </div>
        <div>
            <input type="checkbox" id="profesiones" name="profesiones" ` + (profesiones ? `checked` : `false`) + ` onchange="changeProfesiones()">
            <label for="profesiones">Profesiones</label><br>
        </div>
        <div>
            <input type="checkbox" id="personas" name="personas" ` + (personas ? `checked` : `false`) + ` onchange="changePersonas()">
            <label for="personas">Personas</label><br>
        </div>
        <div>
            <input type="checkbox" id="cosas" name="cosas" ` + (cosas ? `checked` : `false`) + ` onchange="changeCosas()">
            <label for="cosas">Cosas</label><br>
        </div>
        <div>
            <input type="checkbox" id="lugares" name="lugares" ` + (lugares ? `checked` : `false`) + ` onchange="changeLugares()">
            <label for="lugares">Lugares</label><br>
        </div>
        <div>
            <input type="checkbox" id="vehiculos" name="vehiculos" ` + (vehiculos ? `checked` : `false`) + ` onchange="changeVehiculos()">
            <label for="vehiculos">Veh&iacute;culos</label><br>
        </div>
        <div>
            <input type="checkbox" id="verbos" name="verbos" ` + (verbos ? `checked` : `false`) + ` onchange="changeVerbos()">
            <label for="verbos">Verbos</label><br>
        </div>
    </div>`;
}