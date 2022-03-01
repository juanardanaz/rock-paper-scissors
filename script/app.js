// Main Variables
const btnRules = document.getElementById('rules_btn');
const btnClose = document.getElementById('close_btn');
const modalRules = document.getElementById('modal');
const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.getElementById('game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results_result');
const resultWinner = document.getElementById('results_winner');
const resultText = document.getElementById('results_text');
const playAgainBtn = document.getElementById('play_again');
const scoreNumber = document.getElementById('score_number'); 
let score = 0;

const CHOICES = [
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    },
    {
        name: 'rock',
        beats: 'scissors'
    },
];

// Game Basics
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
            <div class="choice ${results[idx].name}">
                <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
            </div>
        `;
      }, idx * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "you win";
            resultDivs[0].classList.toggle("winner");
            keepScore(1);
        } else if (aiWins) {
            resultText.innerText = "you lose";
            resultDivs[1].classList.toggle("winner");
            keepScore(-1);
        } else {
            resultText.innerText = "draw";
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

// Play Again Option
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});

// Score Display
function keepScore(point) {
    score += point
    scoreNumber.innerText = score
}

// The Rules: Show and Hide
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});

