window.isOnline = () => this.navigator.onLine;

const getById = id => document.getElementById(id);

const feedbackContainer = getById('container');
const form = getById('form');
const namearea = getById('name');
const textarea = getById('text');


const feedbackTemplate = (name, text, date, time) => ` 
    <div class="container">
        <br>
        <p>
        <br>
        ${text}
        </p>
        <br>
        <span class="review-date">${date}, ${time}</span>
        <span class="review-author">${name}</span>
    </div>

    <div class="divider"></div>
`

const initAndRenderData = (online) => {
  if (isOnline()) return;
  const data = localStorage.getItem('feedbacks-data');

  if (!data) {
    console.log('Нема доступних локальних даних');
  } else {
    JSON.parse(data).forEach(({ title, value, date, time }) => {
        $('#container').prepend(
        feedbackTemplate(title, value, date, time),
        );
    });
  }
}

const writeLocally = (obj) => {
  const item = localStorage.getItem('feedbacks-data')
  let data = item ? JSON.parse(item) : [];
  data.push(obj);
  localStorage.setItem('feedbacks-data', JSON.stringify(data));
}

const onSubmitPress = (e) => {
  e.preventDefault();

  const isValid = (textarea.value.length > 0 && namearea.value.length > 0);
  form.classList.add('was-validated')

  if (!isValid) return;

  const date = new Date();

  $('#container').prepend(
    feedbackTemplate(namearea.value, textarea.value, date.toLocaleDateString(), date.toLocaleTimeString())
  );

  writeLocally({
    name: namearea.value,
    text: textarea.value,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  });

  form.classList.remove('was-validated');
  namearea.value = '';
  textarea.value = '';
}

const onOnline = () => {
  initAndRenderData();
  console.log('Статус: онлайн, завантажую дані на сервер...');
}

const onOffline = () => {
  initAndRenderData();
  console.log('Відсутнє підключення, перемикаюсь у офлайн режим...');
}


const addButton = getById('submitBtn');
addButton.onclick = onSubmitPress;
window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);

