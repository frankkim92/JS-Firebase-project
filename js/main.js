import { authService } from "./firebase.js";
import {
  handleLocation,
  goToProfile,
  goToMain,
  goToMypage,
  goToWrite,
} from "./router.js";
import { handleAuth, onToggle, logout } from "./pages/auth.js";
import { login_popup, closeModal } from "./pages/login.js";
import { changeModify, getProfileInfor } from "./pages/profile.js";
import {
  changeProfile,
  onFileChange,
  imageRemove,
  tagWrite,
} from "./pages/profilemodify.js";
import { socialLogin } from "./pages/auth.js";

import {
  getFeedData,
  deletePost,
  save_comment,
  update_comment,
  onEditing,
  delete_comment,
  getCommentList,
} from "./pages/feed.js";

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
    handleLocation();
    //  handleLocation();
    const hash = window.location.hash;
    if (user) {
      afterLogin();
      getPostList();
      // alert('dd')
    } else {
      beforeLogin();
      // getFirstPostList();
    }
  });
});

// onclick, onchange, onsubmit 이벤트 핸들러 리스트

window.darkmode = darkmode;
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.getProfileInfor = getProfileInfor;
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
window.goToMain = goToMain;
window.goToMypage = goToMypage;
window.goToWrite = goToWrite;
window.getCommentList = getCommentList;
