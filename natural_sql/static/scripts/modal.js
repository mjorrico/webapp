const modal = document.querySelector("dialog.modal");
const innerDiv = document.querySelector("dialog.modal > .modal-wrapper");
const clearChatBtn = document.querySelector("#output-title>button");
const goBackBtn = document.querySelector(".modal #go-back-button");
const confirmDeleteBtn = document.querySelector(".modal button#delete-button");
const displayField = document.querySelector("#card-output");

clearChatBtn.addEventListener("click", () => {
  modal.showModal();
});

goBackBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", () => {
  modal.close();
});

innerDiv.addEventListener("click", (e) => {
    e.stopPropagation();
});

confirmDeleteBtn.addEventListener("click", () => {
    localStorage.setItem("localArray", JSON.stringify([]));
    displayField.innerHTML = ``;
    modal.close();
});

document.addEventListener("click", (e) => {
  console.log(e.target);
});
