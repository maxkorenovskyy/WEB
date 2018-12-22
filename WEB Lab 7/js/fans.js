const getById = id => document.getElementById(id);

const feedbackContainer = getById('container');
const form = getById('form');
const namefield = getById('name');
const textfield = getById('text');


const feedbackForm = (name, text, date, time) => ` 
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

const onSubmitPress = (e) => {
  e.preventDefault();

  const isValid = (textfield.value.length > 0 && namefield.value.length > 0);
  form.classList.add('was-validated')

  if (!isValid) return;

  const date = new Date();

  $('#container').prepend(
    feedbackForm(namefield.value, textfield.value, date.toLocaleDateString(), date.toLocaleTimeString())
  );

  form.classList.remove('was-validated');
  namefield.value = '';
  textfield.value = '';
}


// Bind listeners to the DOM
const addButton = getById('submitBtn');
addButton.onclick = onSubmitPress;