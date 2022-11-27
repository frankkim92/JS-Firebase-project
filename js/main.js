import { authService } from "./firebase.js";
import { handleLocation, goToProfile } from "./router.js";
import { handleAuth, onToggle, logout } from "./pages/auth.js";
import { login_popup, closeModal } from "./pages/login.js";
import { changeModify } from "./pages/profile.js";
import {
  changeProfile,
  onFileChange,
  imageRemove,
  tagWrite,
} from "./pages/profilemodify.js";
import { socialLogin } from "./pages/auth.js";

// 아래 두개 번갈아가며 껐다 키면서 확인해보기
///////////////// 이전 feed.js
// import {
//   getFeedData,
//   deletePost,
//   save_comment,
//   update_comment,
//   onEditing,
//   delete_comment,
// } from "./pages/feed.js";

///////////////// 리뉴얼 feed.js
import {
  getFeedData,
  deletePost,
  save_comment,
  update_comment,
  onEditing,
  delete_comment,
} from "./pages/feed_renew.js";

import { selectEmoji, save_writing, onCoverChange } from "./pages/writing.js";
import {
  getFirstPostList,
  getPostList,
  beforeLogin,
  afterLogin,
  darkmode,
} from "./pages/mainpage.js";

window.addEventListener("hashchange", handleLocation);
document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged(async (user) => {
    await handleLocation();
    //  handleLocation();
    getFirstPostList();
    const hash = window.location.hash;
    if (user) {
      afterLogin();
    } else {
      beforeLogin();
    }
  });
});

// url 바뀌면 handleLocation 실행하여 화면 변경
// window.addEventListener("hashchange", handleLocation);

// // 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
// document.addEventListener("DOMContentLoaded", function () {
//   // Firebase 연결상태를 감시
//   authService.onAuthStateChanged((user) => {
//     // Firebase 연결되면 화면 표시
//     handleLocation();
//     const hash = window.location.hash;
//     if (user) {
//       // 로그인 상태이므로 항상 팬명록 화면으로 이동
//       // if (hash === "") {
//       //   // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
//       //   window.location.replace("/");
//       // }
//     } else {
//       // 로그아웃 상태이므로 로그인 화면으로 강제 이동
//       if (hash !== "") {
//         window.location.replace("");
//       }
//     }
//   });
// });

// onclick, onchange, onsubmit 이벤트 핸들러 리스트

window.darkmode = darkmode;
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.onFileChange = onFileChange;
window.imageRemove = imageRemove;
window.tagWrite = tagWrite;
window.changeProfile = changeProfile;
window.save_comment = save_comment;
window.update_comment = update_comment;
window.onEditing = onEditing;
window.delete_comment = delete_comment;
window.changeModify = changeModify;
window.login_popup = login_popup;
window.closeModal = closeModal;
window.selectEmoji = selectEmoji;
window.save_writing = save_writing;
window.onCoverChange = onCoverChange;
window.getPostList = getPostList;
window.beforeLogin = beforeLogin;
window.afterLogin = afterLogin;
window.getFeedData = getFeedData;
window.deletePost = deletePost;
