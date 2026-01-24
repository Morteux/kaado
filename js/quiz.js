const startMessages = [
    "よし、始めよう！💪📘",
    "準備はいい？集中タイムだ 🧠✨",
    "今日もいくよ！🚀",
    "軽くウォームアップしよう 🔥",
    "落ち着いて、一問ずつね 😌📝",
    "ここからスタート！📍",
    "頭を切り替えよう 🧠🔄",
    "さあ、挑戦の時間だ ⏱️⚔️",
    "深呼吸して…いこう 🌬️📖",
    "今日の実力、試してみよう 👀✨",
    "コツコツいこう 🐢📚",
    "焦らず、丁寧に 👍",
    "集中モードON 🔛😐",
    "まずは一問目から 👣",
    "ペースは自分次第 😌🎵",
    "頭を起こそう 🛎️🧠",
    "いつも通りで大丈夫 🙆‍♂️",
    "ここが勝負どころ…ではないけどね 😉",
    "肩の力を抜いていこう 💆‍♂️",
    "今日も積み上げるぞ 🧱📘"
];

const endPerfectMessages = [
    "完璧！さすがだね 😄✨",
    "全問正解！脳が光ってるよ 🧠⚡",
    "すごい集中力！お見事 👏🤓",
    "カンジマスターへの道、順調です 🏯📘",
    "ミスなし！これは気持ちいい 😆🎉",
    "完全勝利！今日は覚えがいいね 🏆😎",
    "全部覚えたね？さすが 👀✨",
    "パーフェクト！努力は裏切らない 💪📚",
    "頭が冴えてる！この調子 😺💡",
    "見事にクリア！天才かも 🤯⭐",
    "ノーミス達成！拍手！ 👏👏",
    "漢字が友達になった瞬間だね 🤝🈶",
    "今日の脳トレ、大成功 🧠🎯",
    "これはもう職人レベル 👨‍🏫✨",
    "全問正解！成長を感じる 📈😄",
    "完璧すぎて言葉が出ない 😳🌸",
    "その調子で積み上げよう 🧱📘",
    "かなり仕上がってきたね 😎🔥",
    "漢字に愛されてる説ある 💖🈴",
    "今日も一歩前進！お疲れさま ☕😊"
];

// Common variables
var shuffled = [];
var actualIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var incorrectIndexes = [];

var alreadyStarted = false;

// Search Kanji on Jisho.org when clicked
function addSearchKanjiOnClickFeature() {
    let allTds = document.querySelectorAll('td');

    allTds.forEach(function (tdElement) {
        allTds = document.querySelectorAll('td');
        tdElement.addEventListener('click', function () {
            let kanji = tdElement.innerText;
            let jishoUrl = 'https://jisho.org/search/' + encodeURIComponent(kanji) + '%23kanji';
            window.open(jishoUrl, '_blank');
        });

        tdElement.style.cursor = 'pointer';
    });
}

// Initialization function
function commonInitialize() {
    addSearchKanjiOnClickFeature();

    startTest();
}

function showStrokeButton() {
    document.getElementById("question_element").classList.toggle("question_show_strokes");
}

function startTest() {
    // Reset all variables
    shuffled = Object.keys(kanji_list).sort((a, b) => 0.5 - Math.random());
    actualIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectIndexes = [];

    // Initialize IME input
    var input = document.getElementById('card_input');
    wanakana.bind(input);

    if (!alreadyStarted) {
        alreadyStarted = true;

        // Add event listener to input for Enter key
        document.getElementById("card_input").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("next_button").click();
            }
        });
    }

    if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
        document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]]["kanji"];
    } else {
        document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]]["kana"];
    }

    document.getElementById("actual_counter").innerHTML = 0;
    document.getElementById("total_counter").innerHTML = shuffled.length;

    document.getElementById("correct_answer_meanings").innerHTML = startMessages[Math.floor(Math.random() * startMessages.length)];

    // Show strokes by default
    if (config.show_strokes_by_default) {
        showStrokeButton();
    }
}

function next() {
    let input = document.getElementById("card_input").value;

    let correctAnswers;

    if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
        correctAnswers = [...kanji_list[shuffled[actualIndex]]["readings_on"], ...kanji_list[shuffled[actualIndex]]["readings_kun"]];
    } else {
        correctAnswers = kanji_list[shuffled[actualIndex]]["roumaji"];
    }

    if (!Array.isArray(correctAnswers)) {
        correctAnswers = [correctAnswers];
    }

    // If correct
    if (correctAnswers.some(e => e === input.trim())) {
        ++correctCount;
        $('#img_element').css("background-image", "url('images/correct.png')").fadeIn(0).fadeOut();
    }

    // If incorrect
    else {
        ++incorrectCount;
        $('#img_element').css("background-image", "url('images/incorrect.png')").fadeIn(0).fadeOut();
        incorrectIndexes.push(actualIndex);
    }

    // Show correct answer
    if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
        document.getElementById("correct_answer_question").innerHTML = shuffled[actualIndex];
        document.getElementById("correct_answer_kun").innerHTML = "Kun: " + kanji_list[shuffled[actualIndex]]["readings_kun"].join("、");
        document.getElementById("correct_answer_on").innerHTML = "On: " + kanji_list[shuffled[actualIndex]]["readings_on"].join("、");
        document.getElementById("correct_answer_meanings").innerHTML = kanji_list[shuffled[actualIndex]]["meanings"].join(", ");
    } else {
        document.getElementById("correct_answer_question").innerHTML = shuffled[actualIndex];
        document.getElementById("correct_answer_kun").innerHTML = kanji_list[shuffled[actualIndex]]["roumaji"];
        document.getElementById("correct_answer_on").innerHTML = "";
        document.getElementById("correct_answer_meanings").innerHTML = "";
    }

    // Next question
    document.getElementById("card_input").value = "";

    if (++actualIndex < shuffled.length) {

        if (kanji_list[shuffled[actualIndex]].hasOwnProperty("kanji")) {
            document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]]["kanji"];
        } else {
            document.getElementById("question_element").innerHTML = kanji_list[shuffled[actualIndex]]["kana"];
        }

        document.getElementById("actual_counter").innerHTML = actualIndex;
    } else {
        startEnd();
    }
}

function startEnd() {
    document.getElementById("quiz_content").classList.toggle("hidden");
    document.getElementById("end_content").classList.toggle("hidden");

    document.getElementById("correctCounter").innerHTML = correctCount;
    document.getElementById("incorrectCounter").innerHTML = incorrectCount;

    let answers_container = document.getElementById("answers_container");
    answers_container.innerHTML = "";

    if (incorrectCount != 0) {
        for (let i = 0; i < incorrectIndexes.length; ++i) {

            if (kanji_list[shuffled[incorrectIndexes[i]]].hasOwnProperty("kanji")) {
                answers_container.innerHTML += `
                    <div class="correct_answer_container">
                        <div class="correct_answer">
                            <div class="correct_answer_question">` + shuffled[incorrectIndexes[i]] + `</div>
                            <div class="correct_answer_yomi">
                                <div class="correct_answer_kun">Kun: ` + kanji_list[shuffled[incorrectIndexes[i]]]["readings_kun"].join("、") + `</div>
                                <div class="correct_answer_on">On: ` + kanji_list[shuffled[incorrectIndexes[i]]]["readings_on"].join("、") + `</div>
                            </div>
                        </div>
                        <div class="correct_answer_meanings">` + kanji_list[shuffled[incorrectIndexes[i]]]["meanings"].join(", ") + `</div>
                    </div>`;
            } else {
                answers_container.innerHTML += `
                    <div class="correct_answer_container">
                        <div class="correct_answer">
                            <div class="correct_answer_question">` + shuffled[incorrectIndexes[i]] + `</div>
                            <div class="correct_answer_yomi">
                                <div class="correct_answer_kun">Kun: ` + kanji_list[shuffled[incorrectIndexes[i]]]["roumaji"] + `</div>
                                <div class="correct_answer_on"></div>
                            </div>
                        </div>
                        <div class="correct_answer_meanings"></div>
                    </div>`;
            }
        }
    } else {
        document.getElementById("answers_title").innerHTML = endPerfectMessages[Math.floor(Math.random() * endPerfectMessages.length)];
    }
}

function restart() {
    document.getElementById("end_content").classList.toggle("hidden");

    toggleQuizScreen();

    commonInitialize();
}