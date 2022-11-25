import { authService, storageService, dbService } from "../firebase.js";

import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import {
  addDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const selectEmoji = async (event) => {
  $('input[type="radio"]').on("click", function () {
    let emojiSelect = $('input[name="emoji"]:checked').val();
    console.log(emojiSelect);
  });
};

export const save_writing = async (event) => {
  event.preventDefault();

  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const imgDataUrl = localStorage.getItem("imgDataUrl");
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
    // uploadString 으로 firebase 에 이미지 업로드 > response로 성공했는지 확인
    // imgDataUrl은 임시 이미지 url > 최종 업로드 하면 날라감
    // response.ref 의 객체를 getDownloadURL로 돌려서 나온 값이 downloadUrl
  }

  const coverInput = downloadUrl ? downloadUrl : null;
  const artistName = document.getElementById("artistName");
  const songName = document.getElementById("songName");
  const title = document.getElementById("title");
  const hashTag = document.getElementById("hashTag");
  const bodyText = document.getElementById("bodyText");
  const emojiSelect = $('input[name="emoji"]:checked').val();
  // console.log(emojiSelect);

  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "Writings"), {
      coverInput: coverInput,
      artistName: artistName.value,
      songName: songName.value,
      emotion: emojiSelect,
      title: title.value,
      hashTag: hashTag.value,
      bodyText: bodyText.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    }).then(() => {
      alert("포스트 업로드 완료");
      // window.location.hash = "#fanLog";
    });

    getWritingList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const onCoverChange = (event) => {
  const theCover = event.target.files[0]; // file 객체
  const reader = new FileReader();
  // console.log(theCover);
  reader.readAsDataURL(theCover); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("coverView").src = imgDataUrl;
  };
};

export const changeWrite = async (event) => {
  event.preventDefault();
  document.getElementById("writeBtn").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const imgDataUrl = localStorage.getItem("imgDataUrl");
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    // uploadString 으로 firebase 에 이미지 업로드 > response로 성공했는지 확인
    // imgDataUrl은 임시 이미지 url > 최종 업로드 하면 날라감
    downloadUrl = await getDownloadURL(response.ref);
    // response.ref 의 객체를 getDownloadURL로 돌려서 나온 값이 downloadUrl
  }
  await updateWrite(authService.currentUser, {
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      alert("게시글 수정 완료");
      // window.location.hash = "#fanLog";
    })
    .catch((error) => {
      alert("게시글 수정 실패");
      console.log("error:", error);
    });
};

export const getWritingList = async () => {
  let wrtObjList = [];
  const q = query(
    collection(dbService, "Writings"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const writingObj = {
      id: doc.id,
      ...doc.data(),
    };
    wrtObjList.push(writingObj);
  });
  const writingList = document.getElementById("writing-list");
  // >> writing-list 지영님 main 의 카드에 붙여넣기하면 됨.
  const currentUid = authService.currentUser.uid;
  writingList.innerHTML = "";
  wrtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `<div class="card commentCard">
          <div class="card-body">
              <blockquote class="blockquote mb-0">
                  <p class="commentText">${cmtObj.text}</p>
                  <p id="${
                    cmtObj.id
                  }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
                  <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
                    cmtObj.profileImg
                  }" alt="profileImg" /><span>${
      cmtObj.nickname ?? "닉네임 없음"
    }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
              </blockquote>
              <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                   <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
                <button name="${
                  cmtObj.id
                }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
              </div>            
            </div>
     </div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    writingList.appendChild(div);
  });
};
