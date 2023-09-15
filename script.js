const quizTime = 120;
const timePenalty = 20;

let questionNumber = 0;
let selectedAnswer = 0; //0, 1, 2, 3, 4
let questionAnswered = false;
let timeLeft = 0;

let timer;

let questionText = document.querySelector('#question');
let buttons = document.querySelectorAll('.answer');
let submit = document.querySelector('#submit');
let time = document.querySelector('#time');

let start = document.querySelector('#start');
let save = document.querySelector('#save');

let home = document.querySelector('#home');
let quiz = document.querySelector('#quiz');
let results = document.querySelector('#results');

let questions = [
    {
        question: 'Question 1',
        answers: [
            'answer 1',
            'answer 2',
            'answer 3',
            'answer 4',
        ],
        correctAnswer: 1,
    },
    {
        question: 'Question 2',
        answers: [
            'answer 1',
            'answer 2',
            'answer 3',
            'answer 4',
        ],
        correctAnswer: 1,
    },
    {
        question: 'Question 3',
        answers: [
            'answer 1',
            'answer 2',
            'answer 3',
            'answer 4',
        ],
        correctAnswer: 1,
    },
];

//start quiz
start.addEventListener('click', () => {
    home.setAttribute('style', 'display: none;');
    quiz.setAttribute('style', 'display: block;');
    startTime();
});

//save highscores
save.addEventListener('click', () => {
    results.setAttribute('style', 'display: none;');
    home.setAttribute('style', 'display: block;');
    questionNumber = 0;
    selectedAnswer = 0;
    questionAnswered = false;
    timeLeft = 0;
    //save highscores
    //go to home screen
});

startTime = () => {
    timeLeft = quizTime;
    timer = setInterval(() => {
        timeLeft--;
        time.innerText = timeLeft;
        if (timeLeft <= 0) {
            //end quiz
            quiz.setAttribute('style', 'display: none;');
            results.setAttribute('style', 'display: block;');
            clearInterval(timer);
        }
    }, 1000);
}

//add event listener for each answer button
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        //can only change answer is not submitted
        if (!questionAnswered) {
            //set borders of all buttons to black
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].setAttribute('style', 'border-color: black;');
            }
            //set border of selected button to red
            buttons[i].setAttribute('style', 'border-color: red;');
            selectedAnswer = i + 1;
        }
    });
}

submit.addEventListener('click', () => {
    if (questionAnswered) {
        if (questionNumber === questions.length - 1) {
            //end quiz
            quiz.setAttribute('style', 'display: none;');
            results.setAttribute('style', 'display: block;');
            clearInterval(timer);
        } else {
            //move to the next question
            //update variables
            questionNumber++;
            questionAnswered = false;
            selectedAnswer = 0;
            //change text for next question
            questionText.innerText = questions[questionNumber].question;
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = questions[questionNumber].answers[i];
                buttons[i].setAttribute('style', 'background-color: lightgray; border-color: black;');
            }
            submit.innerText = 'Submit';
        }
    } else {
        //submit the answer
        questionAnswered = true;
        submit.innerText = 'Next';
        //right answer turns green
        buttons[questions[questionNumber].correctAnswer - 1].setAttribute('style', 'background-color: lightgreen;');
        //if wrong answer chosen, answer turns pink and time decreases
        if (selectedAnswer !== questions[questionNumber].correctAnswer) {
            buttons[selectedAnswer - 1].setAttribute('style', 'background-color: pink;');
            timeLeft -= timePenalty;
            time.innerText = timeLeft;
        }
    }
});

/*

Which of the following is a programming lanuage?
Java (the script)
Java (the coffee)
Java (the island)
Jabba (The Hut)

What does the % sign mean?
percentage
modulus
exponentation
skateboarding

What is a string in Javascript?
a line of code
data stored as text
a mathematical expression
material twisted of thin threads

What tells Javascript to return true if one of two options are true?
\\
||
//
¯\_(ツ)_/¯

Which of the following is not a data type?
object
boolean
function
glockenspiel

Which of the following can not define the ends of a string?
"
'
`
麤

What does 1+1+"1" evaluate to?
3
111
21
9000

What does "1"+"1"-1 evaluate to?

What does x-- do?
negates x
subtracts 1 from x
converts the value of x to binary
crashes your browser

How do you tell Javascript to take an exponent?
^
**
exp()
speak firmly yet politely to the monitor

Which of the following would not appear in a for loop?
var i = 0
i < 10
i++
i love you

What does the .push() method do?
adds an element to the start of an array
adds an element to the end of an array
removes an element from the end of an array
shoves the user off their chair

What method adds an element to the start of an array?
.add()
.shift()
.append()
.putItRightAtTheStart()

Which of the following keywords does not declare a variable?
let
var
const
mango

What is the correct way to say "ekse if" in Javascript?
else if
elsif
elif
elsa

What is the colon (:) used for in Javascript?
To start a for loop
To separate values in an array
To assign values to a key in an object
Absorbs water and electrolytes from undigested food

What is the semicolon (;) used for in Javascript?
To close an if statement
To take the modulus of a number
To end a declaration, initialization, function
Absorbs water and electrolytes from semi-undigested food

*/