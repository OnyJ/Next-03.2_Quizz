const URL = "https://opentdb.com/api.php?amount=";
const QUESTION_CARD = document.getElementById("questionCard");
let score = 0;
let countRounds = 0;

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
      countRounds = 0;
      console.log(response);
      QUESTION_CARD.innerHTML = "";
      if (countRounds < response.results.length) showQuestion(response.results);
    });
};

const compareResponse = (correct, choice, rounds) => {
  console.log("compare !");
  if (correct == choice) score += 1;
  if (choice != "") {
    countRounds += 1;
    showQuestion(rounds);
    return;
  }
  return false;
};

showQuestion = (rounds) => {
  let round = rounds[countRounds];

  console.log("bug1");
  QUESTION_CARD.innerHTML = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h1 class="card-title">${round.category}</h1>
      <h2 class="card-subtitle mb-2 text-muted">${round.question}</h2>
      <p>${round.difficulty}</p>
      <div>${showButtons(rounds)}</div>
      </div>
      ${console.log("marche?")}
  </div>
  `;
  console.log(QUESTION_CARD);
  console.log("bug1");
};

showButtons = (rounds) => {
  let round = rounds[countRounds];
  let buttonsDisplay = ``;
  let correct = round.correct_answer;

  if (round.type == "boolean") {
    console.log("boolean buttons");

    console.log("bug2");

    buttonsDisplay = `
      <input id="choice1" type="button" onclick="compareResponse(${correct}, "True", ${rounds}) value="True">
      <input id="choice2" type="button" onclick="compareResponse(${correct}, "False", ${rounds}) value="False">
    `;
    console.log("bug2");
  }
  if (round.type == "multiple") {
    console.log("multiple buttons");

    let choicesArray = [];
    choicesArray.push(round.correct_answer);
    round.incorrect_answers.forEach((answer) => {
      choicesArray.push(answer);
    });

    console.log("answers not mixed : ");
    console.log(choicesArray);

    mixArray(choicesArray);

    console.log("answers mixed : ");
    console.log(choicesArray);

    console.log("bug3");

    buttonsDisplay = `
      <input id="choice1" type="button" onclick="compareResponse(${correct}, ${choicesArray[0]}, ${rounds})" value="${choicesArray[0]}">
      <input id="choice2" type="button" onclick="compareResponse(${correct}, ${choicesArray[1]}, ${rounds})" value="${choicesArray[1]}">
      <input id="choice3" type="button" onclick="compareResponse(${correct}, ${choicesArray[2]}, ${rounds})" value="${choicesArray[2]}">
      <input id="choice4" type="button" onclick="compareResponse(${correct}, ${choicesArray[3]}, ${rounds})" value="${choicesArray[3]}">
    `;
    console.log("bug3");
  }
  return buttonsDisplay;
};

mixArray = (array) => {
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
