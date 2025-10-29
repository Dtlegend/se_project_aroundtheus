const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileExitBtn = document.querySelector("#profile-exit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardbutton = document.querySelector(".profile__add-button");
const addCardExitBtn = document.querySelector("#add-card-exit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-image-modal");
const addCardNameInput = document.querySelector("#add-card-name-input")
const addCardDescriptionInput = document.querySelector("#add-card-description-input");
const profileEditForm = document.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const previewImage = document.querySelector(".modal__image");
const previewCaption = document.querySelector(".modal__caption");
const previewExitBtn = document.querySelector("#preview-image-close-button");


const cardTemplate =
document.querySelector("#card-template").content.firstElementChild;

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function setOverlayCloseListeners() {
  const popups = document.querySelectorAll(".modal");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
         closePopup(popup);
      }
    });
  });
}

function handleEscClose(evt) {
  console.log("key pressed:", evt.key);
if (evt.key === "Escape") {
  console.log("key pressed:", evt.key);
  const openedPopup = document.querySelector(".modal_opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
 }
}

function openPopup(popup) {
 popup.classList.add("modal_opened");
 document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardImageElement.src = cardData.link;

  cardTitleElement.alt = cardData.name;

  cardTitleElement.textContent = cardData.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    console.log("we are attempting to like it")
    cardLikeBtn.classList.toggle("card__like-button_active");
  })

  const cardDeleteBtn  = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", ()=>{
    cardElement.remove()
  })

  cardImageElement.addEventListener("click", ()=>{
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
    //set the src for the image element inside the preview modal to be the link of the card
    //set the textContent for the p element inside the preview modal to be the name of the card
    openPopup(previewModal)
  })
  previewExitBtn.addEventListener("click",() =>{
    closePopup(previewModal)
  })


  return cardElement;

  // function handleCardDeleteBtnSubmit(e) {
  //   //cardListElement.append(cardElement);
  //   //delete cardElement
  //   cardElement.remove()
  // }
}



function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  //redo
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const link = addCardDescriptionInput.value;
  const name = addCardNameInput.value;
  // get what the user has typed in to the addcardmodal inputs
  renderCard( { name, link }, cardListElement);
  closePopup(addCardModal);
  addCardForm.reset();
}



profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //use the openModal function instead
  openPopup(profileEditModal);
});
profileExitBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit)
  closePopup(profileEditModal);



//for loop for the cards

addNewCardbutton.addEventListener("click", () => openPopup(addCardModal));
//addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal)
//);
addCardExitBtn.addEventListener("click", () => {
  closePopup(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit)


initialCards.forEach((cardData) => renderCard(cardData,cardListElement));

setOverlayCloseListeners();