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
 
    // ... [Rest of the questions remain unchanged]

        {
        text: "You already have a sales process?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is you have no system in place" },
            { text: "Yes", nextQuestion: 3 }
        ]
    },
    
    {
        text: "Getting over 300 opt in?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is Not enough data, so your SOLUTION is to nail down offer and close, so testing has greater chance of success, then send more traffic." },
            { text: "Yes", nextQuestion: 4 }
        ]
    },
    {
        text: "Have more than 10 appointments?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is No follow up, SOLUTION is to have a follow up system in place" },
            { text: "Yes", nextQuestion: 5 }
        ]
    },
    {
        text: "Are you making some sales closing?",
        answers: [
            { text: "No", nextQuestion: 6 },
            { text: "Yes", nextQuestion: -1, result: "Ok good, but if you got tired, SOLUTION is to recruit more salesperson to replace or replicate yourself, and scale up sales from here. Wow!" }
        ]
    },
    {
        text: "Have more than 20 appointments?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is No follow up, SOLUTION is to have a follow up system in place" },
            { text: "Yes", nextQuestion: 7 }
        ]
    },
    {
        text: "Money rejection?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is closing. SOLUTION is to tweak your sales closing approach." },
            { text: "Yes", nextQuestion: 8 }
        ]
    },
    {
        text: "Have sales?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is closing. SOLUTION is to tweak your sales closing approach." },
            { text: "Yes", nextQuestion: 9 }
        ]
    },
    {
        text: "Low or high sales?",
        answers: [
            { text: "Low", nextQuestion: -1, result: "Your PROBLEM is filtering leads. SOLUTION is to tweak your lead filtering so you get better qualified leads." },
            { text: "High", nextQuestion: -1, result: "What, you want more sales? Good. Your PROBLEM is you are the bottleneck or you got tired. SOLUTION is to recruit more salesperson to replace or replicate yourself, and scale up sales from here. Wow!" }
        ]
    }
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
