const state = {
    squares: document.querySelectorAll(".square"),
    enemyPosition: null,
    score: 0,
    time: 60
};

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time-left");
const buttonTheme = document.getElementById("themeToggle");
const languageSelect = document.getElementById("language");

const texts = {
    en: {
        time: "Time",
        score: "Score",
        gameOver: "Game Over!",
        result: "Final Score"
    },
    pt: {
        time: "Tempo",
        score: "Pontos",
        gameOver: "Fim de Jogo!",
        result: "Pontuação Final"
    },
    es: {
        time: "Tiempo",
        score: "Puntos",
        gameOver: "Fin del Juego",
        result: "Puntuación Final"
    }
};

let currentLanguage = "en";

/* =========================
   AUDIO
========================= */
function playSound() {
    const audio = new Audio("/docs/audios/hit.m4a");
    audio.volume = 0.2;

    audio.play().catch((error) => {
        console.error("Error playing audio:", error);
    });
}

/* =========================
   LANGUAGE
========================= */
function updateLanguage() {
    document.getElementById("timeLabel").innerText = texts[currentLanguage].time;
    document.getElementById("scoreLabel").innerText = texts[currentLanguage].score;
}

languageSelect.addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    updateLanguage();
});

/* =========================
   RANDOM RALPH
========================= */
function randomSquare() {
    state.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    const randomIndex = Math.floor(Math.random() * state.squares.length);
    const square = state.squares[randomIndex];

    square.classList.add("enemy");
    state.enemyPosition = square.dataset.id;
}

/* =========================
   COUNTDOWN
========================= */
function countDown() {
    state.time--;
    timeElement.textContent = state.time;

    if (state.time <= 0) {
        clearInterval(timerMove);
        clearInterval(timerCount);
        alert(`${texts[currentLanguage].gameOver}\n${texts[currentLanguage].result}: ${state.score}`);
    }
}

/* =========================
   SQUARE CLICK
========================= */
state.squares.forEach((square) => {
    square.addEventListener("click", () => {
        if (square.dataset.id === state.enemyPosition) {
            state.score++;
            scoreElement.textContent = state.score;
            state.enemyPosition = null;
            playSound();
        }
    });
});

/* =========================
   THEME (DARK / LIGHT)
========================= */
buttonTheme.addEventListener("click", () => {
    const body = document.body;
    const dark = body.dataset.theme === "dark";

    body.dataset.theme = dark ? "light" : "dark";
    buttonTheme.textContent = dark ? "☀️" : "🌙";
});

/* =========================
   INITIALIZATION
========================= */
const timerMove = setInterval(randomSquare, 1000);
const timerCount = setInterval(countDown, 1000);

updateLanguage();
