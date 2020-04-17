const URL = "https://opentdb.com/api.php?amount=";
const QUESTION_CARD = document.getElementById("questionCard");

choseQuestionsAmount = (e) => {
  let amount = document.getElementById("questionsAmount");
  let gameURL = URL + amount.value;
  startGame(gameURL);
  e.preventDefault();
};

document
  .getElementById("questionAmountForm")
  .addEventListener("submit", choseQuestionsAmount);

startGame = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      QUESTION_CARD.innerHTML = "";
      response.results.forEach((round) => {
        showQuestion(round);
        // addevent listener here ? for answer select
      });
    });
};

showQuestion = (round) => {
  QUESTION_CARD.innerHTML = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h1 class="card-title">${round.category}</h1>
      <h2 class="card-subtitle mb-2 text-muted">${round.question}</h2>
      <p>${round.difficulty}</p>
      ${showButtons(round)}
    </div>
  </div>
  `;
};

showButtons = (round) => {
  let buttonsDisplay = ``;

  if (round.type == "boolean") console.log("boolean buttons");
  // let buttonsDisplay = ``;
  if (round.type == "multiple") {
    console.log("multiple buttons");

    let choicesArray = [];
    choicesArray.push(round.correct_answer);
    round.incorrect_answers.forEach((answer) => {
      choicesArray.push(answer);
    });

    console.log("answers not mixed : ");
    console.log(choicesArray);

    mix(choicesArray);

    console.log("answers mixed : ");
    console.log(choicesArray);
    buttonsDisplay = `
      <input type="button" value="${choicesArray[0]}">
      <input type="button" value="${choicesArray[1]}">
      <input type="button" value="${choicesArray[2]}">
      <input type="button" value="${choicesArray[3]}">
    `;
  }
  console.log("buttons display : ");
  console.log(buttonsDisplay);
  return buttonsDisplay;
};

mix = (array) => {
  let j, x;
  let length = array.length - 1;
  for (length; length > 0; length--) {
    j = Math.floor(Math.random() * (length + 1));
    x = array[length];
    array[length] = array[j];
    array[j] = x;
  }
  return array;
};
