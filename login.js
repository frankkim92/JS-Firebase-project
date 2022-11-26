// 모달
const openButton = document.getElementById("open");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#modal-overlay");
const closeBtn = document.querySelector("#close");
const openModal = () => {
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);

