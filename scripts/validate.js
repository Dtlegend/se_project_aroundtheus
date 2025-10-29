function showInputError(formEl,inputElement,options) {
  const errorMessageEl = formEl.querySelector(('.modal__error'));
  inputElement.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = errorMessageEl;
  errorMessageEl.classList.add(options.errorClass);
}

function checkInputValidity(formEl, inputElement, options) {
if(!inputElement.validity.valid) {
  showInputError(formEl,inputElement,options);
} else {
  hideInputError(formEl,inputElement,options);
}
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
};

function disableButton(submitButton, inactiveButtonClass) {
  if (!submitButton) return;
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
  console.log("button disabled:", submitButton);
}

function enableButton(submitButton, inactiveButtonClass) {
  if(!submitButton) return;
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
  console.log("button enabled:", submitButton);
}

function toggleButtonState(inputList, submitButton, options) {
 const foundInvalid = hasInvalidInput(inputList);
 if (foundInvalid) {
  disableButton(submitButton, options.inactiveButtonClass);
 } else {
  enableButton(submitButton, options.inactiveButtonClass);
 }
}

function setEventListeners(formEl, options, submitButton) {
  const { inputSelector } = options;
  const inputElement = [...formEl.querySelectorAll(inputSelector)];
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  toggleButtonState(inputElement, submitButton, options);

  inputElement.forEach ((inputEl) => {
    inputEl.addEventListener("input", () => {
       console.log(inputEl.validity);
       checkInputValidity(formEl,inputEl,options);
       // no errors handling, is input valid or not? no handling
       toggleButtonState(inputElement, submitButton, options);
    });
  });
};

function hideInputError(formEl,inputEl,options) {
const errorClass = formEl.querySelector('.modal__error');
inputEl.classList.remove(options.inputErrorClass);
errorClass.textContent = "";
errorClass.classList.remove(options.errorClass);
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
formElements.forEach((formElement) => {
const submitButton = formElement.querySelector(options.submitButtonSelector);
formElement.addEventListener("submit", (e) => {
e.preventDefault();
});
setEventListeners(formElement, options, submitButton);
});
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
