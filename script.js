const quizData = [
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What is the capital of Brazil?",
        a: "Buenos Aires",
        b: "Rio de Janeiro",
        c: "Brasília",
        d: "São Paulo",
        correct: "c",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        a: "William Shakespeare",
        b: "Charles Dickens",
        c: "Jane Austen",
        d: "Emily Brontë",
        correct: "a",
    },
    {
        question: "What is the chemical symbol for silver?",
        a: "Si",
        b: "Ag",
        c: "Au",
        d: "Sn",
        correct: "b",
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        a: "Elephant",
        b: "Tiger",
        c: "Lion",
        d: "Gorilla",
        correct: "c",
    },
    {
        question: "What is the largest bird in the world?",
        a: "Ostrich",
        b: "Penguin",
        c: "Eagle",
        d: "Albatross",
        correct: "a",
    },
    {
        question: "What is the chemical symbol for water?",
        a: "W",
        b: "H2O",
        c: "O2",
        d: "HO",
        correct: "b",
    },
    {
        question: "Who wrote the novel 'To Kill a Mockingbird'?",
        a: "Harper Lee",
        b: "Mark Twain",
        c: "J.D. Salinger",
        d: "Ernest Hemingway",
        correct: "a",
    },
    {
        question: "Who is the CEO of Tesla Motors?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Mark Zuckerberg",
        correct: "b",
    },
    {
        question: "What is the capital of Australia?",
        a: "Sydney",
        b: "Melbourne",
        c: "Canberra",
        d: "Perth",
        correct: "c",
    },
    {
        question: "What is the largest organ in the human body?",
        a: "Brain",
        b: "Liver",
        c: "Skin",
        d: "Heart",
        correct: "c",
    },
    {
        question: "Who wrote the novel '1984'?",
        a: "George Orwell",
        b: "Aldous Huxley",
        c: "J.K. Rowling",
        d: "F. Scott Fitzgerald",
        correct: "a",
    },
    {
        question: "What is the chemical symbol for gold?",
        a: "Au",
        b: "Ag",
        c: "Fe",
        d: "Hg",
        correct: "a",
    },
    {
        question: "What is the tallest mountain in the world?",
        a: "Mount Kilimanjaro",
        b: "Mount Everest",
        c: "Mount Fuji",
        d: "Mount McKinley",
        correct: "b",
    },
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c",
    },
    {
        question: "What is the largest mammal?",
        a: "Elephant",
        b: "Blue Whale",
        c: "Giraffe",
        d: "Hippopotamus",
        correct: "b",
    },
    {
        question: "How many continents are there in the world?",
        a: "5",
        b: "6",
        c: "7",
        d: "8",
        correct: "c",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

let currentQuiz = 0;
let score = 0;
let wrongAnswers = [];

let timer;

const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    clearInterval(timer);
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = `${currentQuizData.question} (10s)`;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    startTimer();
};

const startTimer = () => {
    let timeLeft = 10; // 10 seconds
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuiz++;
            if (currentQuiz < quizData.length) loadQuiz();
            else showResult();
        } else {
            questionElement.innerText = `${quizData[currentQuiz].question} (${timeLeft}s)`;
            timeLeft--;
        }
    }, 1000);
};

const showResult = () => {
    quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>`;
    if (wrongAnswers.length > 0) {
        let wrongAnswerHTML = "<h3>Incorrect Answers:</h3>";
        wrongAnswers.forEach((wrong, index) => {
            wrongAnswerHTML += `<p>${index + 1}. ${quizData[wrong].question}</p>`;
        });
        resultContainer.innerHTML = wrongAnswerHTML;
    }
};

loadQuiz();

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        clearInterval(timer);
        if (answer === quizData[currentQuiz].correct) score++;
        else wrongAnswers.push(currentQuiz);
        currentQuiz++;
        if (currentQuiz < quizData.length) loadQuiz();
        else showResult();
    }
});
