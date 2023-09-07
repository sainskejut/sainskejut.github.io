let currentQuestion = 0;

const questions = [
    {
        text: "Hi, what's your name?",
        input: true
    },
    {
        text: "What's your email please?",
        input: true
    },
    {
        text: "You already have a sales process?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is you have no system in place" },
            { text: "Yes", nextQuestion: 3 }
        ]
    },
    // ... [Rest of the questions remain unchanged]
];

function displayQuestion() {
    const question = questions[currentQuestion];
    let html = `<p>${question.text}</p>`;
    
    if (question.input) {
        html += `<input type="text" id="user-input" placeholder="${currentQuestion === 0 ? 'Enter your name' : 'Enter your email'}">`;
        html += `<button onclick="handleTextInput()">Submit</button>`;
    } else {
        question.answers.forEach((answer, index) => {
            html += `<button onclick="handleAnswer(${index})">${answer.text}</button>`;
        });
    }
    
    document.getElementById("question-container").innerHTML = html;
}

function handleTextInput() {
    const userInput = document.getElementById("user-input").value.trim();
    
    if (!userInput) {
        alert("Please enter a value.");
        return;
    }
    
    // Record the input
    const recordDiv = document.createElement("div");
    recordDiv.innerText = questions[currentQuestion].text + ": " + userInput;
    document.getElementById("answer-record").appendChild(recordDiv);
    
    currentQuestion++;
    displayQuestion();
}

function handleAnswer(index) {
    const answer = questions[currentQuestion].answers[index];
    
    // Record the answer
    const recordDiv = document.createElement("div");
    recordDiv.innerText = questions[currentQuestion].text + ": " + answer.text;
    document.getElementById("answer-record").appendChild(recordDiv);
    
    if (answer.nextQuestion === -1) {
        document.getElementById("result").innerText = answer.result;
        document.getElementById("question-container").innerHTML = "";
    } else {
        currentQuestion = answer.nextQuestion;
        displayQuestion();
    }
}

document.getElementById("reset-btn").addEventListener("click", function() {
    currentQuestion = 0;
    document.getElementById("answer-record").innerHTML = "";
    document.getElementById("result").innerText = "";
    displayQuestion();
});

document.getElementById("email-btn").addEventListener("click", function() {
    const subject = "Sales Problem Diagnosis Results";
    const body = document.getElementById("answer-record").innerText + "\n\n" + document.getElementById("result").innerText;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("print-btn").addEventListener("click", function() {
    window.print();
});

document.getElementById("share-btn").addEventListener("click", function() {
    if (navigator.share) {
        navigator.share({
            title: 'Sales Problem Diagnosis Results',
            text: document.getElementById("answer-record").innerText + "\n\n" + document.getElementById("result").innerText,
            url: window.location.href,
        });
    } else {
        alert("Sharing is not supported on this browser.");
    }
});

// Display the current date and time at the top of the page
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
document.getElementById("current-date-time").innerText = formattedDate;

displayQuestion();
