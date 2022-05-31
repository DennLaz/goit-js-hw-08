'use strict';
import throttle from 'lodash.throttle';

const formEL = document.querySelector('.feedback-form');

const FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';

formEL.addEventListener('input', throttle(onInputValueForm, 500));
formEL.addEventListener('submit', onSubmitForm);
const feedbackFormObj = {};

function fillValueFormInputs(form) {
  const localStorageData = JSON.parse(localStorage.getItem(FORM_LOCAL_STORAGE_KEY));

  const elemtntsForm = form.elements;

  if (localStorageData) {
    const valuesObjLocalStorage = Object.keys(localStorageData);

    valuesObjLocalStorage.forEach(el => (elemtntsForm[el].value = localStorageData[el]));
  }
}

fillValueFormInputs(formEL);

function onInputValueForm(e) {
  const { target } = e;

  const formElValue = target.value;
  const formElName = target.name;

  feedbackFormObj[formElName] = formElValue;

  localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(feedbackFormObj));
}

function onSubmitForm(e) {
  e.preventDefault();
  e.currentTarget.reset();

  console.log(localStorage.getItem(FORM_LOCAL_STORAGE_KEY));

  localStorage.removeItem(FORM_LOCAL_STORAGE_KEY);
}
