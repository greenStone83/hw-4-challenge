const quizTime = 240;
const timePenalty = 20;

let questionNumber = 0;
let selectedAnswer = 0; //0, 1, 2, 3, 4
let questionAnswered = false;
let timeLeft = 0;

let timer;

let highScore = localStorage.getItem('high-score');
let initials = localStorage.getItem('initials');

let start = document.querySelector('#start');
let record2 = document.querySelector('#record2');

//divs
let home = document.querySelector('#home');
let quiz = document.querySelector('#quiz');
let results = document.querySelector('#results');

//quiz screen
let questionText = document.querySelector('#question');
let buttons = document.querySelectorAll('.answer');
let submit = document.querySelector('#submit');
let time = document.querySelector('#time');
let progress = document.querySelector('#progress');

//results screen
let selfScore = document.querySelector('#self-score');
let record = document.querySelector('#record');
let instruct = document.querySelector('#instruct');
let input = document.querySelector('#input');
let save = document.querySelector('#save');

//says the record on the homescreen
if (highScore > 0) {
    record2.innerText = `The record score is ${highScore} by ${initials}`;
} else {
    record2.innerText = 'There is no record score';
}

//start quiz
start.addEventListener('click', () => {
    //move to quiz screen
    home.setAttribute('style', 'display: none;');
    quiz.setAttribute('style', 'display: block;');
    //start the timer
    timeLeft = quizTime;
    time.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        time.innerText = timeLeft;
        if (timeLeft <= 0) {
            timeLeft = 0;
            endQuiz();
        }
    }, 1000);
    //add quiz text
    questionText.innerText = questions[questionNumber].question;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = questions[questionNumber].answers[i];
        buttons[i].setAttribute('style', 'background-color: white');
    }
    submit.innerText = 'Submit';
    progress.innerText = `${questionNumber + 1}/${questions.length}`;
});

//add event listener for each answer button
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        //can only change answer is not submitted
        if (!questionAnswered) {
            //sets all butons to white
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].setAttribute('style', 'background-color: white;');
            }
            //sets selected button to light gray
            buttons[i].setAttribute('style', 'background-color: lightgray;');
            selectedAnswer = i + 1;
        }
    });
}

//submit answer or next question
submit.addEventListener('click', () => {
    if (questionAnswered) {
        //update variables for next question
        questionNumber++;
        questionAnswered = false;
        selectedAnswer = 0;
        if (questionNumber === questions.length) {
            endQuiz();
        } else {
            //change text for next question
            questionText.innerText = questions[questionNumber].question;
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = questions[questionNumber].answers[i];
                buttons[i].setAttribute('style', 'background-color: white;');
            }
            submit.innerText = 'Submit';
            progress.innerText = `${questionNumber + 1}/${questions.length}`;
        }
    } else {
        if (selectedAnswer) {
            //submit the answer
            questionAnswered = true;
            submit.innerText = 'Next';
            //right answer turns green
            buttons[questions[questionNumber].correctAnswer - 1].setAttribute('style', 'background-color: lightgreen;');
            //if wrong answer chosen, answer turns pink
            if (selectedAnswer !== questions[questionNumber].correctAnswer) {
                buttons[selectedAnswer - 1].setAttribute('style', 'background-color: pink;');
                //deduct time if answered wrong
                timeLeft -= timePenalty;
                if (timeLeft <= 0) {
                    timeLeft = 0;
                    endQuiz();
                }
                time.innerText = timeLeft;
            }
        } else {
            alert('Please select an answer');
        }
    }
});

endQuiz = () => {
    //move to results screen
    quiz.setAttribute('style', 'display: none;');
    results.setAttribute('style', 'display: block;');
    clearInterval(timer);
    //change text of results screen
    selfScore.innerText = `You had ${timeLeft} seconds left`;
    if (initials === null) {
        //no record score
        record.innerText = 'There is no record score';
        highScore = 0;
    } else if (timeLeft > highScore) {
        //high score is beaten
        record.innerText = `The previous record score was ${highScore} by ${initials}`;
    } else {
        //high score not beaten
        record.innerText = `The record score is ${highScore} by ${initials}`;
    }
    if (timeLeft > highScore) {
        //high score is beaten
        instruct.innerText = 'Type your initials';
        input.setAttribute('style', 'display: block;');
        save.innerText = 'Save';
    } else if (timeLeft === 0) {
        //did not finish quiz
        instruct.innerText = 'Get a score above 0 to save your score';
        save.innerText = 'Back';
    } else {
        //high score is not beaten
        instruct.innerText = 'Beat the record to save your score';
        save.innerText = 'Back';
    }
}

reset = () => {
    //back to home screen
    results.setAttribute('style', 'display: none;');
    home.setAttribute('style', 'display: block;');
    input.setAttribute('style', 'display: none;');
    //reset variables
    input.value = '';
    questionAnswered = false;
    questionNumber = 0;
    timeLeft = 0;
    //add record score text to home screen
    if (highScore > 0) {
        record2.innerText = `The record score is ${highScore} by ${initials}`;
    } else {
        record2.innerText = 'There is no record score';
    }
}

//save highscores
save.addEventListener('click', () => {
    if (timeLeft > highScore) {
        if (input.value.length < 3) {
            alert('Enter 3 initials');
        } else {
            //save variables
            localStorage.setItem('high-score', timeLeft);
            highScore = timeLeft;
            localStorage.setItem('initials', input.value);
            initials = input.value;
            reset();
        }
    } else {
        reset();
    }
});