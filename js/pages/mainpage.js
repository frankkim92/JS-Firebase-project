import {
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { dbService, authService } from "../firebase.js";

//header
export function afterLogin() {
  // document.getElementById("header-after").style.visibility = "visible";
  const login = document.querySelector(".login");
  login.innerHTML = ` <div class="btn-wrapper">
<button class="btn-profile" id="#profileImg"></button>
<button class="btn-triangle"></button>
</div>
<div class="dropdown-menu">
<a href="#">로그아웃</a>
<a href="#">마이페이지</a>
</div>`.trim();
}

export function beforeLogin() {
  const login = document.querySelector(".login");
  login.innerHTML = `
<a href="#" class="sign-in">로그인</a>`.trim();
}
// e;
//오늘 날짜.
//
// const date = new Date().toLocaleDateString("en-us", {
//   weekday: "long",
//   year: "numeric",
//   day: "numeric",
//   month: "short",
// }); //"Tuesday, Nov 22, 2022"
// const today = document.getElementById("date");
// today.innerText = `${date}`;

//POST LIST
export const getPostList = async () => {
  let postObjList = [];
  const q = query(
    collection(dbService, "Writings"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log("doc.data():", doc.data());
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    postObjList.push(postObj);
  });
  const postList = document.getElementById("post-list");
  const currentUid = authService.currentUser.uid;
  postList.innerHTML = "";
  // console.log(postObjList);
  // 붙여넣기전 기존것들 다 초기화(삭제)
  postObjList.forEach((postObj) => {
    const isOwner = currentUid === postObj.creatorId;
    // const str = new Date(postObj.createdAt);
    // const week = str.textCon
    // const month = str.split(" ", 2);
    const temp_html = `<div class="card" id=${
      postObj.id
    } onclick="getFeedData(event)">
    <div class="card-head">
      <img src="${postObj.coverInput}" />
    </div>
    <div class="card-body-wrapper">
      <div class="card-body-head">
        <h3 class="post-title">
          ${postObj.title}
        </h3>
        <div class="post-emoji">
          <img src="../assets/${postObj.emotion.toLowerCase()}.png">
        </div>
      </div>
      <p class="body-text">
        ${postObj.bodyText}
      </p>
      <div class="tag">
        <button type="button" class="hashtag">#힐링</button>
        <button type="button" class="hashtag">#사랑</button>
        <button type="button" class="hashtag">#정우최고</button>
      </div>
      <div class="card-footer-wrapper">
        <div class="card-user">
          <img src="${
            postObj.profileImg ?? "/assets/blankProfile.webp"
          }" class="footer-img" />
          <p class="card-p">by</p>
          <p class="card-p">${postObj.nickname ?? "닉네임 없음"}</p>
        </div>
        <p class="card-p">${new Date(postObj.createdAt)
          .toString()
          .slice(0, 4)}, ${new Date(postObj.createdAt)
      .toString()
      .slice(4, 8)}</p>
      </div>
    </div>
  </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
};

export const getFirstPostList = async () => {
  let postObjList = [];
  const q = query(
    collection(dbService, "Writings"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log("doc.data():", doc.data());
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    postObjList.push(postObj);
  });
  const postList = document.getElementById("post-list");
  // const currentUid = authService.currentUser.uid;
  postList.innerHTML = "";
  // console.log(postObjList);
  // 붙여넣기전 기존것들 다 초기화(삭제)
  postObjList.forEach((postObj) => {
    // const isOwner = currentUid === postObj.creatorId;
    // const str = new Date(postObj.createdAt);
    // const week = str.textCon
    // const month = str.split(" ", 2);

    const temp_html = `<div class="card" id=${
      postObj.id
    } onclick="getFeedData(event)">
    <div class="card-head">
      <img src="${postObj.coverInput}" />
    </div>
    <div class="card-body-wrapper">
      <div class="card-body-head">
        <h3 class="post-title">
          ${postObj.title}
        </h3>
        <div class="post-emoji">
          <img src="../assets/${postObj.emotion.toLowerCase()}.png">
        </div>
      </div>
      <p class="body-text">
        ${postObj.bodyText}
      </p>
      <div class="tag">
        <button type="button" class="hashtag">#힐링</button>
        <button type="button" class="hashtag">#사랑</button>
        <button type="button" class="hashtag">#정우최고</button>
      </div>
      <div class="card-footer-wrapper">
        <div class="card-user">
          <img src="${
            postObj.profileImg ?? "/assets/blankProfile.webp"
          }" class="footer-img" />
          <p class="card-p">by</p>
          <p class="card-p">${postObj.nickname ?? "닉네임 없음"}</p>
        </div>
        <p class="card-p">${new Date(postObj.createdAt)
          .toString()
          .slice(0, 4)}, ${new Date(postObj.createdAt)
      .toString()
      .slice(4, 8)}</p>
      </div>
    </div>
  </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
};
