let currentQuestion = 0;

const questions = [
    {
        text: "Have sales process?",
        answers: [
            { text: "No", nextQuestion: -1, result: "No system in place" },
            { text: "Yes", nextQuestion: 1 }
        ]
    },
    {
        text: "Getting over 300 opt in?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Not enough data, solution is to nail down offer and close, so testing has greater chance of success, then send more traffic." },
            { text: "Yes", nextQuestion: 2 }
        ]
    },
    {
        text: "Have more than 10 appointments?",
        answers: [
            { text: "No", nextQuestion: -1, result: "No follow up" },
            { text: "Yes", nextQuestion: 3 }
        ]
    },
    {
        text: "Closing?",
        answers: [
            { text: "No", nextQuestion: 4 },
            { text: "Yes", nextQuestion: -1, result: "You are the bottleneck. Solution = replace yourself and scale." }
        ]
    },
    {
        text: "Have more than 20 appointments?",
        answers: [
            { text: "No", nextQuestion: -1, result: "No follow up" },
            { text: "Yes", nextQuestion: 5 }
        ]
    },
    {
        text: "Money rejection?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Real problem = closing" },
            { text: "Yes", nextQuestion: 6 }
        ]
    },
    {
        text: "Have sales?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Real problem = closing" },
            { text: "Yes", nextQuestion: 7 }
        ]
    },
    {
        text: "Low or high sales?",
        answers: [
            { text: "Low", nextQuestion: -1, result: "Real problem = filter" },
            { text: "High", nextQuestion: -1, result: "You are the bottleneck. Solution = replace yourself and scale." }
        ]
    }
];

function displayQuestion() {
    const question = questions[currentQuestion];
    let html = `<p>${question.text}</p>`;
    question.answers.forEach((answer, index) => {
        html += `<button onclick="handleAnswer(${index})">${answer.text}</button>`;
    });
    document.getElementById("question-container").innerHTML = html;
}

function handleAnswer(index) {
    const answer = questions[currentQuestion].answers[index];
    if (answer.nextQuestion === -1) {
        document.getElementById("result").innerText = answer.result;
        document.getElementById("question-container").innerHTML = "";
    } else {
        currentQuestion = answer.nextQuestion;
        displayQuestion();
    }
}

displayQuestion();
