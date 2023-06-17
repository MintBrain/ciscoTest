import { qData } from './data.js';

const questionContainer = document.body.querySelector('.question');
const optionsContainer = document.body.querySelector('.options');
const submitButton = document.body.querySelector('.check');
const showButton = document.body.querySelector('.show');
const previousButton = document.body.querySelector('.previous');
const nextButton = document.body.querySelector('.next');
const resetButton = document.body.querySelector('.reset');
const randButton = document.body.querySelector('.random');
const corA = document.body.querySelector('.corA');

let data = [...qData];

let curQ = 0;

const setQuestion = (question, answers, correctAnswers) => {
    corA.hidden = true;
    document.querySelector('.image').innerHTML = '';
    if (question.startsWith('TEMP=')) {
        let pic = question.slice(6, question.indexOf('\"', 7))
        questionContainer.textContent = question.slice(question.indexOf('\"', 7)+1);
        let pic2 = document.createElement('img');
        pic2.src = `./pics/${pic}`;
        document.querySelector('.image').insertAdjacentElement('beforeend', pic2);
    } else {
        questionContainer.textContent = question;
    }
   

    optionsContainer.innerHTML = '';
    let type = 'checkbox';
    if (correctAnswers.length === 1) {
        type = 'radio';
    }

    for (const answer of answers) {
        const d = document.createElement('div');
        let inputEl = document.createElement('input');
        inputEl.type = type;
        inputEl.value = answer;
        inputEl.name = 'cisco'
        d.insertAdjacentElement('beforeend', inputEl);
        let sp = document.createElement('span');
        sp.textContent = answer;
        d.insertAdjacentElement('beforeend', sp);
        d.insertAdjacentHTML('beforeend', '<br>')
        optionsContainer.insertAdjacentElement('beforeend', d);
    }

    corA.innerHTML = '';
/*     for (const cor of correctAnswers) {

        const correctAns = document.createElement('span');
        correctAns.textContent =  answers[cor];
        corA.insertAdjacentElement('beforeend', correctAns);
        corA.insertAdjacentHTML('beforeend', '<br>')
    } */

    
};

const submitHandler = (evt) => {
    evt.preventDefault();
    const rAns = data[curQ][1].filter((ans, i) => data[curQ][2].includes(i));
    optionsContainer.querySelectorAll('div').forEach((d) => {
        d.querySelector('span').classList = '';
        if (rAns.includes(d.querySelector('span').textContent) && d.querySelector('input').checked) {
            d.querySelector('span').classList.add('right');
        } else if (!rAns.includes(d.querySelector('span').textContent) && d.querySelector('input').checked) {
            d.querySelector('span').classList.add('wrong');
        }
        
    });
    corA.hidden = false;
};

const prevHandler = (evt) => {
    evt.preventDefault();
    if (curQ === 0) {
        curQ = data.length - 1;
    } else {
        curQ -= 1;
    }
    
    setQuestion(data[curQ][0], data[curQ][1], data[curQ][2]);
};

const nextHandler = (evt) => {
    evt.preventDefault();
    if (curQ === data.length - 1) {
        curQ = 0
    } else {
        curQ += 1;
    }
    setQuestion(data[curQ][0], data[curQ][1], data[curQ][2]);
};

const resetClick = (evt) => {
    evt.preventDefault();
    curQ = 0;
    data = [...qData];
    setQuestion(data[curQ][0], data[curQ][1], data[curQ][2]);
};

const showClick = (evt) => {
    evt.preventDefault();
    const rAns = data[curQ][1].filter((ans, i) => data[curQ][2].includes(i));
    optionsContainer.querySelectorAll('div').forEach((d) => {
        d.querySelector('span').classList = '';
        if (rAns.includes(d.querySelector('span').textContent)) {
            d.querySelector('input').checked = true;
            d.querySelector('span').classList.add('right');
        } else if (!rAns.includes(d.querySelector('span').textContent)) {
            d.querySelector('input').checked = false;
        }
        
    });
}

const onOptClick = (evt) => {
    if (evt.target.tagName === 'SPAN') {
        evt.preventDefault();
        evt.target.previousElementSibling.checked = !evt.target.previousElementSibling.checked;
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
    setQuestion(data[curQ][0], data[curQ][1], data[curQ][2]);
};

setQuestion(data[curQ][0], data[curQ][1], data[curQ][2])

submitButton.addEventListener('click', submitHandler);
previousButton.addEventListener('click', prevHandler);
nextButton.addEventListener('click', nextHandler);
resetButton.addEventListener('click', resetClick);
showButton.addEventListener('click', showClick);
optionsContainer.addEventListener('click',onOptClick);
randButton.addEventListener('click', randHandler);
