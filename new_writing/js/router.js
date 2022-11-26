import { authService } from "./firebase.js";

const routes = {
  404: "/pages/404.html",
  style: "/style.html",
  "/": "/pages/mainPage.html",
  fanLog: "/pages/fanLog.html",
  mypage: "/pages/mypage.html",
  login: "/pages/login.html",
  sign_up: "/pages/sign_up.html",
  login: "/pages/login.html",
  feed: "/pages/feed.html",
  profile: "/pages/profile.html",
  profileModify: "/pages/profilemodify.html",
};
import { getCommentList } from "./pages/feed.js";
import {getProfileList} from "./pages/profile.js";
// import { getPostList } from "./pages/mainpage.js";

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

  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === "feed") {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    console.log('authService.currentUser',authService.currentUser)
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
  }
  if (path === "profile") {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
      getProfileList()
  }

  if (path === "/") {
    getPostList();
  }

};

export const goToProfile = () => {
  window.location.hash = "#profile";
};