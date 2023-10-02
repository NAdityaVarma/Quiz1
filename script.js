
// Define your quiz questions and answers as an array of objects
const questions = [
    {
        question: "What is 5 - 3?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "B"
    },
    {
        question: "Which of the following is  2 square?",
        options: ["3", "4", "5", "7"],
        correctAnswer: "B"
    },
    {
        question: "Which of the following is prime number?",
        options: ["3", "4", "8", "6"],
        correctAnswer: "A"
    },
    {
        question: "Which of the following is  non prime number?",
        options: ["4", "2", "3", "5"],
        correctAnswer: "A"
    },
    {
        question: "Which of the following is a number is palindrome?",
        options: ["124", "121", "564", "246"],
        correctAnswer: "B"
    }
    // Add more questions here
];

const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");
const questionContainer = document.getElementById("question-container");
const scoreElement = document.getElementById("score");
const quizCompletedElement = document.getElementById("quiz-completed");

let timer; // Timer variable
let currentQuestion = 0; // Keep track of the current question
let quizStarted = false; // To track if the quiz has started
let score = 0; // Initialize the score

startButton.addEventListener("click", function () {
    if (!quizStarted) {
        quizStarted = true;
        document.getElementById("start-container").style.display = "none"; // Hide the start button
        questionContainer.style.display = "block"; // Show the question container
        loadQuestion(currentQuestion);
    }
});

submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", nextQuestion);

function loadQuestion(questionIndex) {
    const questionData = questions[questionIndex];
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = `Question ${questionIndex + 1}: ${questionData.question}`;

    // Populate answer options
    optionsElement.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${String.fromCharCode(65 + index)}"> ${option}`;
        optionsElement.appendChild(label);
    });

    // Reset timer and enable buttons for the new question
    clearInterval(timer);
    enableButtons();
    startTimer(30); // 30 seconds timer for each question
}

function startTimer(seconds) {
    let time = seconds;
    timer = setInterval(function () {
        const secondsDisplay = time < 10 ? `0${time}` : `${time}`;
        timeLeftElement.textContent = `0:${secondsDisplay}`;

        if (time === 0) {
            clearInterval(timer);
            timeLeftElement.textContent = "0:00";
            // Automatically move to the next question when time is up
            nextQuestion();
        } else {
            time--;
        }
    }, 1000);
}

function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const questionData = questions[currentQuestion];

        if (userAnswer === questionData.correctAnswer) {
            score++; // Increase score for correct answer
        }

        disableButtons(); // Disable buttons after submitting
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        // End of the quiz, display the final score
        clearInterval(timer);
        questionContainer.style.display = "none";
        scoreElement.textContent = `Score: ${score}/${questions.length}`;
        scoreElement.style.display = "block";

        // Display "Quiz Completed!" message with animation
        quizCompletedElement.textContent = " Quiz Completed!";
        quizCompletedElement.style.display = "block";
        quizCompletedElement.style.animation = "bounce 1s"; // Example animation
    }

    // Clear the selected answer for the next question
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
    });

    enableButtons(); // Enable buttons for the next question
}

function disableButtons() {
    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

function enableButtons() {
    submitButton.style.display = "block";
    nextButton.style.display = "block";
}
