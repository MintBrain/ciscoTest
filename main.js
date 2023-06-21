import { qData } from "./data.js";

const questionContainer = document.body.querySelector(".question");
const optionsContainer = document.body.querySelector(".options");
const submitButton = document.body.querySelector(".check");
const showButton = document.body.querySelector(".show");
const previousButton = document.body.querySelector(".previous");
const nextButton = document.body.querySelector(".next");
const resetButton = document.body.querySelector(".reset");
const randButton = document.body.querySelector(".random");
const indexContainer = document.body.querySelector('.index');

let data = [...qData];
let curQ = 0;

const indexUpdate = (index) => {
  indexContainer.textContent = `${index} / ${data.length}`;
};

const setQuestion = (question, answers, correctAnswers) => {
  document.querySelector(".image").innerHTML = "";
  if (question.startsWith("TEMP=")) {
    let pic = question.slice(6, question.indexOf('"', 7));
    questionContainer.textContent = question.slice(
      question.indexOf('"', 7) + 1
    );
    let pic2 = document.createElement("img");
    pic2.src = `./pics/${pic}`;
    document.querySelector(".image").insertAdjacentElement("beforeend", pic2);
  } else {
    questionContainer.textContent = question;
  }

  optionsContainer.innerHTML = "";
  let type = "checkbox";
  if (correctAnswers.length === 1) {
    type = "radio";
  }

  if (answers.length === 1) {
    const d = document.createElement("div");
    let inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.placeholder = "Введи ответ";
    inputEl.name = "cisco";
    inputEl.classList = 'text'
    d.insertAdjacentElement("beforeend", inputEl);

    d.insertAdjacentHTML("beforeend", "<br>");
    optionsContainer.insertAdjacentElement("beforeend", d);

    return;
  }

  for (const answer of answers) {
    const d = document.createElement("div");
    let inputEl = document.createElement("input");
    inputEl.type = type;
    inputEl.value = answer;
    inputEl.name = "cisco";
    d.classList = 'inpDiv';
    d.insertAdjacentElement("beforeend", inputEl);
    let sp = document.createElement("span");
    sp.textContent = answer;
    d.insertAdjacentElement("beforeend", sp);
    d.insertAdjacentHTML("beforeend", "<br>");
    optionsContainer.insertAdjacentElement("beforeend", d);
  }
};

const submitHandler = (evt) => {
  evt.preventDefault();
  const rAns = data[curQ][2].filter((ans, i) => data[curQ][3].includes(i));

  if (optionsContainer.firstChild.firstChild.type === "text") {
    optionsContainer.firstChild.classList = "";
    if (optionsContainer.firstChild.firstChild.value === rAns[0]) {
      optionsContainer.firstChild.classList.add("right");
    } else {
      optionsContainer.firstChild.classList.add("wrong");
    }
    return;
  }

  optionsContainer.querySelectorAll("div").forEach((d) => {
    d.querySelector("span").classList = "";
    if (
      rAns.includes(d.querySelector("span").textContent) &&
      d.querySelector("input").checked
    ) {
      d.querySelector("span").classList.add("right");
    } else if (
      !rAns.includes(d.querySelector("span").textContent) &&
      d.querySelector("input").checked
    ) {
      d.querySelector("span").classList.add("wrong");
    }
  });
};

const prevHandler = (evt) => {
  evt.preventDefault();
  if (curQ === 0) {
    curQ = data.length - 1;
  } else {
    curQ -= 1;
  }
  indexUpdate(data[curQ][0]);
  setQuestion(data[curQ][1], data[curQ][2], data[curQ][3]);
};

const nextHandler = (evt) => {
  evt.preventDefault();
  if (curQ === data.length - 1) {
    curQ = 0;
  } else {
    curQ += 1;
  }
  indexUpdate(data[curQ][0]);
  setQuestion(data[curQ][1], data[curQ][2], data[curQ][3]);
};

const resetClick = (evt) => {
  evt.preventDefault();
  curQ = 0;
  data = [...qData];
  indexUpdate(data[curQ][0]);
  setQuestion(data[curQ][1], data[curQ][2], data[curQ][3]);
};

const showClick = (evt) => {
  evt.preventDefault();
  const rAns = data[curQ][2].filter((ans, i) => data[curQ][3].includes(i));

  if (optionsContainer.firstChild.firstChild.type === "text") {
    optionsContainer.firstChild.firstChild.value = rAns[0];
    optionsContainer.firstChild.classList = "right";

    return;
  }

  optionsContainer.querySelectorAll("div").forEach((d) => {
    d.querySelector("span").classList = "";
    if (rAns.includes(d.querySelector("span").textContent)) {
      d.querySelector("input").checked = true;
      d.querySelector("span").classList.add("right");
    } else if (!rAns.includes(d.querySelector("span").textContent)) {
      d.querySelector("input").checked = false;
    }
  });
};

const onOptClick = (evt) => {
  if (evt.target.tagName === "SPAN") {
    evt.preventDefault();
    evt.target.previousElementSibling.checked =
      !evt.target.previousElementSibling.checked;
  }
};

function ShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randHandler = (evt) => {
  evt.preventDefault();
  data = ShuffleArray(data);
  curQ = 0;
  indexUpdate(data[curQ][0]);
  setQuestion(data[curQ][1], data[curQ][2], data[curQ][3]);
};


indexUpdate(data[curQ][0]);
setQuestion(data[curQ][1], data[curQ][2], data[curQ][3]);

submitButton.addEventListener("click", submitHandler);
previousButton.addEventListener("click", prevHandler);
nextButton.addEventListener("click", nextHandler);
resetButton.addEventListener("click", resetClick);
showButton.addEventListener("click", showClick);
optionsContainer.addEventListener("click", onOptClick);
randButton.addEventListener("click", randHandler);
