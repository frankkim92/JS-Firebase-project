import { authService } from "./firebase.js";

const routes = {
  404: "/pages/404.html",

  "/": "/pages/login.html",
  writePage: "/pages/writePage.html",
  viewPage: "/pages/viewPage.html",
  myPage: "/pages/myPage.html",
  myviewPage: "/pages/myviewPage.html",
  profileModify: "/pages/profileModify.html",
  teamInfor: "/pages/teamInfor.html",
  main: "/pages/main.html",
  feed: "/pages/feed.html",
  teamInfor: "/pages/teamInfor.html",
};
import { getCommentList } from "./pages/feed.js";
import { getProfileInfor } from "./pages/profile.js";
import { getMyPostList } from "./pages/myPage.js";
import { getPostList } from "./pages/mainpage.js";

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

  if (
    path === "profileModify" ||
    path === "viewPage" ||
    path === "main" ||
    path === "myPage" ||
    path === "myviewPage"
  ) {
    getMyPostList();
    getPostList();
  }

  if (path === "myviewPage") {
    getMyPostList();
  }

  if (path === "main" || path === "writePage" || path === "veiwPage") {
    getPostList();
  }

  if (path === "myPage") {
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "../assets/blankProfile.webp";
    getProfileInfor();
    getMyPostList();
    getProfileList();
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    getCommentList();
  }

  // console.log(today);
  // 특정 화면 렌더링 되자마자 DOM 조작 처리

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

  //모든 프로필 불러오기
  document.getElementById("commentImg").src =
    authService.currentUser.photoURL ?? "../assets/blankProfile.webp";
};

export const goToProfile = () => {
  window.location.hash = "#profile";
};
export const goToMain = () => {
  window.location.hash = "#main";
};
// export const goToMypage = () => {
//   window.location.hash = "#mainPage";
// };
export const goToWrite = () => {
  window.location.hash = "#writePage";
};

export const goToView = () => {
  console.log("goToView");

  window.location.hash = "#viewPage";
};

export const goTomyView = () => {
  console.log("goTomyView");

  window.location.hash = "#myviewPage";
  getMyPostList();
};

export const goToTeamInfor = () => {
  window.location.hash = "#teamInfor";
};
