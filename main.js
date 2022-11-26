import { authService } from "../js/firebase";
import { handleLocation } from "../js/router";

//오늘 날짜.
export const date = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
}); //"Tuesday, Nov 22, 2022"
const today = window.querySelector(".date");
today.innertext = date;

function afterLogin() {
  document.getElementById("header-after").style.display = "none";
}
function beforeLogin() {
  document.getElementById("header-before").style.display = "non;";
}

document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;

    if (user) {
      beforeLogin();
    } else {
      afterLogin();
    }
  });
});
