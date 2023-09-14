let questionNumber = 0;
let selectedAnswer = 0; //0, 1, 2, 3, 4
let questionAnswered = false;

let questionText = document.querySelector('#question');
let buttons = document.querySelectorAll('.answer');
let submit = document.querySelector('#submit');

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

//add event listener for each answer button
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        //set borders of all buttons to black
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].setAttribute('style', 'border-color: black;');
        }
        //set border of selected button to red
        buttons[i].setAttribute('style', 'border-color: red;');
        selectedAnswer = i + 1;
    });
}

submit.addEventListener('click', () => {
    if (questionAnswered) {
        if (questionNumber === questions.length - 1) {
            //end quiz
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
            }
            submit.innerText = 'Submit';
        }
    } else {
        //submit the answer
        questionAnswered = true;
        submit.innerText = 'Next';
        //right answer turns green
        buttons[questions[questionNumber].correctAnswer].setAttribute('style', 'background-color: lightgreen;');
        //wrong answer, if chosen, turns pink
        if (selectedAnswer !== questions[questionNumber].correctAnswer) {
            buttons[selectedAnswer].setAttribute('style', 'background-color: pink;');
        }
    }
});

/*

home screen
    "Javascript Quiz"
    high scores
    start button - goes to quiz screen

quiz screen
    question
    answers
    time
    submit button -
        gives correct or incorrect answer
        turns into next button

results screen
    save inititals
    high score
    submit button - goes to home screen

*/

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