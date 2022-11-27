import { authService } from "./firebase.js";

const routes = {
  404: "/pages/404.html",
  style: "/style.html",
  "/": "/pages/main.html",
  writePage: "/pages/mainPage.html",
  fanLog: "/pages/fanLog.html",
  mypage: "/pages/myPage.html",
  login: "/pages/login.html",
  sign_up: "/pages/sign_up.html",
  login: "/pages/login.html",
  feed: "/pages/feed.html",
  teaminfor: "/pages/teaminfor.html",
  profile: "/pages/profile.html",
  profileModify: "/pages/profilemodify.html",
};
import { getCommentList } from "./pages/feed.js";
import { getProfileInfor } from "./pages/profile.js";
// import { getProfileList } from "./pages/profilemodify";
import { getMyPostList } from "./pages/myPage.js";
import { getFirstPostList } from "./pages/mainpage.js";

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");
  const pathName = window.location.pathname;

  // Live Server를 index.html에서 오픈할 경우
  if (pathName === "/index.html") {
    window.history.pushState({}, "", "/");
  }
  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  //날짜불러오기
  const day = new Date().toLocaleDateString("en-us", {
    day: "numeric",
  });
  const month = new Date().toLocaleDateString("en-us", {
    month: "short",
  });
  const today = document.querySelector("#date");
  const today_date = document.querySelector("#today_date");
  today.textContent = `${month}, ${day}`;
  today_date.textContent = `${month}, ${day}`;

  //모든닉네임 불러오기
  document.getElementById("profileNickname").textContent =
    authService.currentUser.displayName ?? "닉네임 없음";

  // console.log(today);
  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === "/" || path === "writePage") {
    getFirstPostList();
  }

  if (path === "feed") {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    console.log("authService.currentUser", authService.currentUser);
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("commentImg").src =
      authService.currentUser.photoURL ?? "../assets/blankProfile.webp";

    getCommentList();
  }
  if (path === "profileModify") {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
    document.getElementById("profileNickname").placeholder =
      authService.currentUser.displayName ?? "닉네임 없음";
    getMyPostList();
  }
  // if (path === "profile") {
  //   // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
  //   document.getElementById("profileView").src =
  //     authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
  //   getProfileList();
  // }

  if (path === "profile" || path === "writePage") {
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
    getMyPostList();
    getProfileInfor();
  }
};

export const goToProfile = () => {
  window.location.hash = "#profile";
};
export const goToMain = () => {
  window.location.hash = "/";
};
export const goToMypage = () => {
  window.location.hash = "#mypage";
};
export const goToWrite = () => {
  window.location.hash = "#writePage";
};
