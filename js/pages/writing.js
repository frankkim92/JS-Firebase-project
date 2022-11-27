import { authService, storageService, dbService } from "../firebase.js";

import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const selectEmoji = async (event) => {
  $('input[type="radio"]').on("click", function () {
    let emojiSelect = $('input[name="emoji"]:checked').val();
    console.log(emojiSelect);
  });
};

export const posting = (event) => {
  // window.location.hash = "#login"
  window.location.hash = "#writePage";
}

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
  const emojiSelect = document.querySelector("input[name='emoji']:checked");
  // const emojiSelect = $('input[name="emoji"]:checked');

  // console.log(emojiSelect);

  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "Writings"), {
      coverInput: coverInput,
      artistName: artistName.value,
      songName: songName.value,
      emotion: emojiSelect.value,
      // emotion: emojiSelect.val()
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

    const defaultImage = document.getElementById("coverView");

    defaultImage.src = "/assets/select_file.png";
    artistName.value = "";
    songName.value = "";
    emojiSelect.checked = false;
    // emojiSelect.prop("checked", false);
    title.value = "";
    hashTag.value = "";
    bodyText.value = "";

    // 지워주기 >>> 맞는지 확인, 업로드하면 상세페이지로 전환되니까 필요없나?
    await getPostList(event);
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
