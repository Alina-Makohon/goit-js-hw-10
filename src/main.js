// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';
import { PREP_TIME } from './js/menu';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

let timerID;
const makeOrder = ({ status, timeToDo }) => {
  return new Promise((resolve, reject) => {
    timerID = setTimeout(() => {
      if (status === 'fulfilled') {
        console.log(status);

        resolve(timeToDo);
      } else {
        reject(timeToDo);
      }
    }, timeToDo);
  });
};
function addOrderRow(name) {
  const newOrder = document.createElement('li');
  newOrder.classList.add('row-pending');
  newOrder.textContent = `⏳ ${name} · у роботі…`;

  orderLog.append(newOrder);
  return newOrder;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const drink = formData.get('drink');
  const status = formData.get('state');

  const timeToDo = PREP_TIME[drink];
  const row = addOrderRow(drink);
  makeOrder({ status, timeToDo })
    .then(() => {
      row.classList = 'row-ok';
      row.textContent = `✅ ${drink} · готове · ${timeToDo} ms`;
    })
    .catch(() => {
      row.classList = 'row-err';
      row.textContent = `❌ ${drink} · скасовано · ${timeToDo} ms`;
    })
    .finally(() => {
      row.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
