//var hiragana;
//var katakana;
//var kanji;

var kanji_count = 0;
var kanji_total = 0;

var kanji_list = {};

var config = {
    answer_key: "spanish",
    show_strokes_by_default: false
}

document.addEventListener("DOMContentLoaded", (event) => {
    const mes = new Date().getMonth() + 1; // 1–12

    if (window.innerWidth < 640) {

        if (mes >= 3 && mes <= 5) {
            document.body.style.backgroundImage = "url('../images/backgrounds/spring_anim_mobile.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_haru)";
        }
        else if (mes >= 6 && mes <= 8) {
            document.body.style.backgroundImage = "url('../images/backgrounds/summer_anim_mobile.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_natsu)";
        }
        else if (mes >= 9 && mes <= 11) {
            document.body.style.backgroundImage = "url('../images/backgrounds/fall_anim_mobile.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_aki)";
        }
        else {
            document.body.style.backgroundImage = "url('../images/backgrounds/winter_anim_mobile.svg')";
            document.body.style.backgroundColor = "--var(--usuzora)";
        }

    } else {

        if (mes >= 3 && mes <= 5) {
            document.body.style.backgroundImage = "url('../images/backgrounds/spring_anim.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_haru)";
        }
        else if (mes >= 6 && mes <= 8) {
            document.body.style.backgroundImage = "url('../images/backgrounds/summer_anim.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_natsu)";
        }
        else if (mes >= 9 && mes <= 11) {
            document.body.style.backgroundImage = "url('../images/backgrounds/fall_anim.svg')";
            document.body.style.backgroundColor = "--var(--temaeoka_aki)";
        }
        else {
            document.body.style.backgroundImage = "url('../images/backgrounds/winter_anim.svg')";
            document.body.style.backgroundColor = "--var(--usuzora)";
        }
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    kanji_total += Object.keys(hiragana).length;
    document.getElementById('kanji_total').innerText = kanji_total;
    enableHiraganaCheckboxes();

    kanji_total += Object.keys(katakana).length;
    document.getElementById('kanji_total').innerText = kanji_total;
    enableKatakanaCheckboxes();

    kanji_total += Object.keys(kanji).length;
    document.getElementById('kanji_total').innerText = kanji_total;
    enableKanjiCheckboxes();
});

function enableHiraganaCheckboxes() {
    document.getElementById('hiragana').disabled = false;
}

function enableKatakanaCheckboxes() {
    document.getElementById('katakana').disabled = false;
}

function enableKanjiCheckboxes() {
    document.getElementById('grade1').disabled = false;
    document.getElementById('grade2').disabled = false;
    document.getElementById('grade3').disabled = false;
    document.getElementById('grade4').disabled = false;
    document.getElementById('grade5').disabled = false;
    document.getElementById('grade6').disabled = false;
    document.getElementById('grade6plus').disabled = false;

    document.getElementById('jlptN5').disabled = false;
    document.getElementById('jlptN4').disabled = false;
    document.getElementById('jlptN3').disabled = false;
    document.getElementById('jlptN2').disabled = false;
    document.getElementById('jlptN1').disabled = false;
    document.getElementById('jlptN0').disabled = false;
}



// Common functions
document.addEventListener("DOMContentLoaded", (event) => {
});

function updateKanjiCount() {
    kanji_list = {};
    kanji_count = 0;

    // Kana
    if (document.getElementById('hiragana').checked) {
        kanji_list = { ...kanji_list, ...convertKanaToObject(hiragana) };
    }
    if (document.getElementById('katakana').checked) {
        kanji_list = { ...kanji_list, ...convertKanaToObject(katakana) };
    }

    // Jyouyou Grades
    if (document.getElementById('grade1').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(1) };
    }
    if (document.getElementById('grade2').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(2) };
    }
    if (document.getElementById('grade3').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(3) };
    }
    if (document.getElementById('grade4').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(4) };
    }
    if (document.getElementById('grade5').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(5) };
    }
    if (document.getElementById('grade6').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(6) };
    }
    if (document.getElementById('grade6plus').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByGrade(8) };  // Grade 8 is for more than grade 6
    }

    // JLPT Levels
    if (document.getElementById('jlptN5').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(5) };
    }
    if (document.getElementById('jlptN4').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(4) };
    }
    if (document.getElementById('jlptN3').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(3) };
    }
    if (document.getElementById('jlptN2').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(2) };
    }
    if (document.getElementById('jlptN1').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(1) };
    }
    if (document.getElementById('jlptN0').checked) {
        kanji_list = { ...kanji_list, ...searchKanjiByJLPT(null) };    // JLPT level null is for kanji outside the JLPT levels
    }

    if (Object.keys(kanji_list).length == 0) {
        document.getElementById('start_button').disabled = true;
    } else {
        document.getElementById('start_button').disabled = false;
    }
    document.getElementById('kanji_count').innerText = Object.keys(kanji_list).length;
}

function convertKanaToObject(kana) {
    let results = {};

    for (let key in kana) {
        if (!results.hasOwnProperty(kana[key].kana)) {
            results[kana[key].kana] = kana[key];
        }
    }

    return results;
}

function searchKanjiByGrade(grade) {
    let results = {};

    for (let key in kanji) {
        if (kanji[key].grade === grade && !results.hasOwnProperty(key)) {
            let value = kanji[key];
            value.kanji = key;
            results[key] = value;
        }
    }

    return results;
}

function searchKanjiByJLPT(jlpt_level) {
    let results = {};

    for (let key in kanji) {
        if (kanji[key].jlpt_new === jlpt_level && !results.hasOwnProperty(key)) {
            let value = kanji[key];
            value.kanji = key;
            results[key] = value;
        }
    }

    return results;
}

function toggleStartScreen() {
    document.getElementById('start_kanji_stat').classList.toggle("hidden");
    document.getElementById('start_configuration').classList.toggle("hidden");
    document.getElementById('start_button_container').classList.toggle("hidden");
}

function toggleQuizScreen() {
    document.getElementById('quiz_content').classList.toggle("hidden");
}