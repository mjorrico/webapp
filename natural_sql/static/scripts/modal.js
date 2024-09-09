import { updateContext } from "./context.js";

const settingsBtn = document.querySelector("#output-wrapper button.setting");
const closeBtn = document.querySelector(".modal .close");

const modal = document.querySelector("dialog.modal");
const innerDiv = document.querySelector("dialog.modal > .modal-wrapper");
const clearChatBtn = document.querySelector(".modal .body > div#delete");
const addContextBtn = document.querySelector(".modal .body > div#context");

const clearChatModal = document.querySelector("#confirm-delete");
const goBackBtn = document.querySelector(
  "dialog#confirm-delete .buttons > #back"
);
const confirmDeleteBtn = document.querySelector(
  "dialog#confirm-delete .buttons > button#del"
);
const innerDivDelete = document.querySelector(
  "dialog#confirm-delete > .modal-wrapper"
);

const contextModal = document.querySelector("dialog#change-context");
const contextWrapper = document.querySelector(
  "dialog#change-context > .modal-wrapper"
);
const contextCloseBtn = document.querySelector(
  "dialog#change-context .title > .close"
);
const contextGoBackBtn = document.querySelector(
  "dialog#change-context div.buttons > button.cancel"
);

const displayField = document.querySelector("#card-output");

contextModal.showModal();

addContextBtn.addEventListener("click", () => {
  contextModal.showModal();
  modal.close();
});

contextCloseBtn.addEventListener("click", () => {
  updateContext();
  modal.showModal();
  contextModal.close();
});

contextGoBackBtn.addEventListener("click", () => {
  updateContext();
  modal.showModal();
  contextModal.close();
});

settingsBtn.addEventListener("click", () => {
  modal.showModal();
});

clearChatBtn.addEventListener("click", () => {
  clearChatModal.showModal();
  modal.close();
});

goBackBtn.addEventListener("click", () => {
  clearChatModal.close();
  modal.showModal();
});

confirmDeleteBtn.addEventListener("click", () => {
  localStorage.setItem("localArray", JSON.stringify([]));
  displayField.innerHTML = ``;
  modal.close();
  clearChatModal.close();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", () => {
  modal.close();
});

innerDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});

clearChatModal.addEventListener("click", () => {
  clearChatModal.close();
});

innerDivDelete.addEventListener("click", (e) => {
  e.stopPropagation();
});

contextModal.addEventListener("click", () => {
  updateContext();
  contextModal.close();
});

contextWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
});
