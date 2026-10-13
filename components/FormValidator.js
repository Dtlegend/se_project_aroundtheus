class FormValidator {

   constructor(settings, formElement ) {
    this._inputSelector = settings.inputSelector;
   this._submitButtonSelector = settings.submitButtonSelector;
   this._inactiveButtonClass = settings.inactiveButtonClass;
   this._inputErrorClass = settings.inputErrorClass;
   this._errorClass = settings.errorClass;

   this._form = formElement;
  }



 _showInputError(inputElement,errorMessageEl) {
  const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}


_hasInvalidInput(formEl,inputList) {
return inputList.some((inputEl) => !inputEl.validity.valid);
}

_toggleButtonState(inputList, submitButton, options) {
const foundInvalid = hasInvalidInput(inputList);
 if (foundInvalid) {
  disableButton(submitButton, options.inactiveButtonClass);
 } else {
  enableButton(submitButton, options.inactiveButtonClass);
 }
}

 _setEventListeners() {
  const { inputSelector } = this._options;
  const inputElement = Array.from(this._formEl.querySelectorAll(inputSelector));
  this._formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  this._toggleButtonState(inputElement, submitButton, options);

  inputElement.forEach ((inputEl) => {
    inputEl.addEventListener("input", () => {
       console.log(inputEl.validity);
       checkInputValidity(this.formEl,inputEl,options);
       // no errors handling, is input valid or not? no handling
       toggleButtonState(inputElement, submitButton, options);
    });
  });
 }

 enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}
export default FormValidator;
