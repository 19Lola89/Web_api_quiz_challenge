// DOM elements
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// setting variables
var time = questionsArr.length * 10;
var timer;
var currentQuestionIndex = 0;

function startQuiz() {
  // data-hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // data- un-hide section
  questionsEl.removeAttribute("class");

  // start timer
  timer = setInterval(clock, 1000);

  // show starting time
  timerEl.textContent = time;

  getNextQuestion();
}

function getNextQuestion() {
  // get current question object from array
  var currentQuestion = questionsArr[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out previous question choices
  choicesEl.innerHTML = "";

  // questions loop
  currentQuestion.choices.forEach(function (option, i) {
    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "option");
    choiceButton.setAttribute("value", option);

    choiceButton.textContent = i + 1 + ". " + option;

    // attach click event listener to every choice button
    choiceButton.onclick = questionPress;

    // display on the page
    choicesEl.appendChild(choiceButton);
  });
}

function questionPress() {
  // right/wrong guess
  if (this.value !== questionsArr[currentQuestionIndex].answer) {
    // deductucting time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "300%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "300%";
  }

  // right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questionsArr.length) {
    quizEnd();
  } else {
    getNextQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timer);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clock() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
    alert("game over");
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
// });
