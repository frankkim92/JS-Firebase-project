export const login_popup = (event) => {
	event.preventDefault();
	const modal = document.querySelector("#modal");
	modal.classList.remove("hidden");
}


export const closeModal = (event) => {
	event.preventDefault();
	const modal = document.querySelector("#modal");
	modal.classList.add("hidden");
}