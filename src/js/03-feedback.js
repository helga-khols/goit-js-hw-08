import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const message = document.querySelector('textarea');
const email = document.querySelector('input');

const LOCALSTORAGE_KEY = 'feedback-form-state';

reloadPage();

form.addEventListener('input', throttle(saveData, 500));
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function saveData(e) {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  const userData = data ? JSON.parse(data) : {};
  userData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userData));
}

function reloadPage() {
  const parsedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (!parsedData) return;
  email.value = parsedData.email || '';
  message.value = parsedData.message || '';
}
