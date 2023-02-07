function printHighscores() {
  // setting up to empty arr or get the items from local storage
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  // highscore sort
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

document.getElementById("clear").onclick = clearHighscores;

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

printHighscores();
