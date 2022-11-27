export const login_popup = () => {
  // event.preventDefault();
  const modal = document.querySelector("#modal");
  modal.classList.remove("hidden");
};

export const closeModal = () => {
  // event.preventDefault();
  const modal = document.querySelector("#modal");
  modal.classList.add("hidden");
};
