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

function startTest() {

    document.getElementById("main").innerHTML = `
    <div id="cards" class="cards">
        <div id="element_container">
            <p id="char_element" class="char_element"></p>
            <div id="img_element" class="img_element"></div>
        </div>
        <div><tag>Roman syllable: </tag><input id="latin_input" type="text"></input></div>
        <div>
            <button id="next" onclick="next()">Next</button>
            <button id="correct" onclick="correct()">Correct</button>
        </div>
    </div>`;

    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;

    shuffled = dictionary.hiragana.sort((a, b) => 0.5 - Math.random());
    document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
}

function next() {
    let input = document.getElementById("latin_input").value;

    if(input == shuffled[actualIndex].latin)
    {
        ++correctCount;
        // document.getElementById("element_container").style.backgroundImage = "url('images/correct.png')";
        // $("element_container").each(function(index) {
        //     $(this).hide();
        //     $(this).delay(1000* index).fadeIn(1000).fadeOut();
        // });
        // $('#img_element').css("background-image", "url('images/correct.png')").opacity = 100;
        // $('#img_element').css("background-image", "url('images/correct.png')").animate({opacity: 0}, 500);
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();

    } else {
        ++incorrectCount;
        // document.getElementById("element_container").style.backgroundImage = "url('images/incorrect.png')";
        // $("element_container").each(function(index) {
        //     $(this).hide();
        //     $(this).delay(1000* index).fadeIn(1000).fadeOut();
        // });
        // $('#img_element').css("background-image", "url('images/incorrect.png')").opacity = 100;
        // $('#img_element').css("background-image", "url('images/incorrect.png')").animate({opacity: 0}, 500);
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();

    }
    // $('#element_container').css("background-image", "url('')").animate({opacity: 1}, 500);

    if(++actualIndex < shuffled.length) {
        document.getElementById("char_element").innerHTML = shuffled[actualIndex].japanese;
        document.getElementById("latin_input").value = "";
    } else {
        document.getElementById("char_element").innerHTML = "FIN";
        document.getElementById("next").disabled = true;
        document.getElementById("correct").disabled = true;
        
        startEnd();
    }
}

function correct() {

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