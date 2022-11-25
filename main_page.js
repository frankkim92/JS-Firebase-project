import { authService } from "../firebase.js";
import { handleLocation } from "../router.js";

//오늘 날짜.
const date = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
}); //"Tuesday, Nov 22, 2022"
const today = document.getElementById("date");
today.innerText = `${date}`;

function afterLogin() {
  // document.getElementById("header-after").style.visibility = "visible";
  const login = document.querySelector(".login");
  login.innerHTML = ` <div class="btn-wrapper">
  <button class="btn-profile"></button>
  <button class="btn-triangle"></button>
</div>
<div class="dropdown-menu">
  <a href="#">로그아웃</a>
  <a href="#">마이페이지</a>
</div>`.trim();
}

function beforeLogin() {
  const login = document.querySelector(".login");
  login.innerHTML = `
  <a href="#" class="sign-in">로그인</a>
  <a href="#" class="sign-up">회원가입</a>`.trim();

  // document.getElementById("header-before").style.visibility = "visible";
  //   header.innerHTML = `<div class="header" id="header-before">
  //   <div class="logo">
  //     <img
  //       src="../assets/musicnote.svg"
  //       alt="musiclogo"
  //       class="music-img" />
  //     <h1 class="logo">소록소록</h1>
  //   </div>

  //   <div class="login">
  //     <a href="#" class="sign-in">로그인</a>
  //     <a href="#" class="sign-up">회원가입</a>
  //   </div>
  // </div>`.trim();
}

document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;

    if (user) {
      afterLogin();
    } else {
      beforeLogin();
    }
  });
});
