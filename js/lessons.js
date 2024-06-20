const CHECKS_LENGTH = Object.keys(lessons_json).length;


document.addEventListener("DOMContentLoaded", (event) => {

    for (let i = 0; i < CHECKS_LENGTH; ++i) {
        category_checks.push(false);
    }

    category_checks[0] = true;

    restart();
});

function changeCategory(category_index) {
    category_checks[category_index - 1] = !category_checks[category_index - 1];
}

function calculateWordsArray() {
    let words = [];

    for (let index = 0; index < category_checks.length; ++index) {
        if (category_checks[index]) { words = words.concat(lessons_json["lesson" + (index + 1)]); }
    }

    return words;
}


function restart() {

    let text = `
    <button class="start_button" onclick="startTest()">Start test</button>
    <div class="checkboxes_container">`;

    for (let i = 1; i <= CHECKS_LENGTH; ++i) {
        text += `<div>
                    <input type="checkbox" id="` + i + `" name="` + i + `" ` + (category_checks[i - 1] ? `checked` : `false`) + ` onchange="changeCategory(` + i + `)">
                    <label for="` + i + `">Lesson ` + i + `</label><br>
                </div>`;
    }

    text += `</div>`;

    document.getElementById("main").innerHTML = text;
}