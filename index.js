const questions = [
  {
    question: 'Which is the largest animal in the world',
    answer: [
      {
        text: 'shark',
        correct: false,
      },
      {
        text: 'blue whale',
        correct: true,
      },
      {
        text: 'elephant',
        correct: false,
      },
      {
        text: 'giraffe',
        correct: false,
      },
    ],
  },
  {
    question: 'Which is programming language is use for functioning',
    answer: [
      {
        text: 'HTML',
        correct: false,
      },
      {
        text: 'CSS',
        correct: false,
      },
      {
        text: 'JAVASCRIPT',
        correct: true,
      },
      {
        text: 'ALL OF THEM',
        correct: false,
      },
    ],
  },
  {
    question: 'Which programming language is uses styling',
    answer: [
      {
        text: 'HTML',
        correct: false,
      },
      {
        text: 'JAVASCRIPT',
        correct: false,
      },
      {
        text: 'CSS',
        correct: true,
      },
      {
        text: 'ALL OF THE ABOVE',
        correct: false,
      },
    ],
  },
  {
    question: 'Which is the smallest continent in the world',
    answer: [
      {
        text: 'asia',
        correct: false,
      },
      {
        text: 'australia',
        correct: true,
      },
      {
        text: 'Arctic',
        correct: false,
      },
      {
        text: 'Africa',
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let question = currentQuestionIndex + 1;
    questionElement.innerHTML = question + ". " + currentQuestion.question;

    currentQuestion.answer.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = answer.text;
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    } else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz()