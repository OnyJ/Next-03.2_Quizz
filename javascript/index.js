const URL = "https://opentdb.com/api.php?amount=";

startGame = (e) => {
  let amount = document.getElementById("questionsAmount");
  let gameURL = URL + amount.value;
  console.log(gameURL);
  e.preventDefault();
};

document
  .getElementById("questionAmountForm")
  .addEventListener("submit", startGame);
