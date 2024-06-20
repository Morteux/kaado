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

    if (comidas) { words = words.concat(dictionary.comidas); }
    if (bebidas) { words = words.concat(dictionary.bebidas); }
    if (semana) { words = words.concat(dictionary.semana); }
    if (adverbiosTemporales) { words = words.concat(dictionary.adverbiosTemporales); }
    if (paises) { words = words.concat(dictionary.paises); }
    if (profesiones) { words = words.concat(dictionary.profesiones); }
    if (personas) { words = words.concat(dictionary.personas); }
    if (cosas) { words = words.concat(dictionary.cosas); }
    if (lugares) { words = words.concat(dictionary.lugares); }
    if (vehiculos) { words = words.concat(dictionary.vehiculos); }
    if (verbos) { words = words.concat(dictionary.verbos); }

    return words;
}














function restart() {
    document.getElementById("main").innerHTML = `
    <button class="start_button" onclick="startTest()">Start test</button>
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