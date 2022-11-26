// 모달
const openButton = document.getElementById("register");
const modal = document.querySelector("#signup");
const overlay = document.querySelector("#overlay");
const closeBtn = document.querySelector("#close-btn");
const openModal = () => {
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);