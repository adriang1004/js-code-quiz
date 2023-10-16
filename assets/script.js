var startButton = document.getElementById('start-button');
var quizScreen = document.getElementById('quiz-screen'); 
var endScreen = document.getElementById('end-screen'); 
var questionElement = document.getElementById('question');
var choices = document.getElementById('choices');
var timeElement = document.getElementById('time'); 
var finalScore = document.getElementById('final-score');
var initialsInput = document.getElementById('initials');
var submitScoreButton = document.getElementById('submit-score'); 
// var scoreList = document.getElementById('score-list');
var negTimeEl = document.getElementById('neg-time');
// var initials = initialsInput.value;

var currentQuestionIndex = 0;
var timeLeft = 120;
var score = 0;
var negTime = 0;


var questions = [
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A fruit", "A movie"],
        correctAnswer: "A programming language",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes",
    },
    {
        question: "The condition in an if / else statement is enclosed with _____.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "booleans", "other arrays", "all of the above"], 
        correctAnswer: "all of the above",
    }
];

function startQuiz() {
    startButton.style.display = 'none';
    quizScreen.style.display = 'block';
    nextQuestion();
    startTimer();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choices.innerHTML = '';

        for (let i = 0; i < currentQuestion.choices.length; i++) {
            var choice = currentQuestion.choices[i];
            var button = document.createElement('button'); 
            button.textContent = choice; 
            button.classList.add('choice');
            button.addEventListener('click', checkAnswer);
            choices.appendChild(button);
        }
        } else { 
            endQuiz(); 
    }
}


function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    } else {
        timeLeft -= 10;
        // alert("Incorrect! -10 seconds");
        negTime -= 10;
        negTimeEl.innerHTML = negTime + ' seconds'; 
    }

    currentQuestionIndex++;
    nextQuestion();
}

function startTimer() {
    timeElement.textContent = timeLeft;
    timerInterval = setInterval(function()  {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizScreen.style.display = 'none';
    endScreen.style.display = 'block';
    finalScore.textContent = score;
}

function displayScores() {
    var highScores = document.createElement("li");
    var initials = initialsInput.value;
    highScores.textContent = (initials + ', Score: ' + score);
    document.body.appendChild(highScores);
    highScores.setAttribute("style", "color: white; padding: 10px; margin: 10px");

}

submitScoreButton.addEventListener('click', function(event)  {
    event.preventDefault();
    var initials = initialsInput.value;
    console.log('Initials: ' + initials + ', Score: ' + score);
    displayScores(); 
})

startButton.addEventListener('click', startQuiz);
