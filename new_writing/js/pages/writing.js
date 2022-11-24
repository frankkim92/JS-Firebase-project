import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateWrite } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeWrite = async (event) => {
  event.preventDefault();
  document.getElementById("writeBtn").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  // const newNickname = document.getElementById("profileNickname").value;
  // >> writing에 해당하는 값으로 변경하기
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
    // displayName: newNickname ? newNickname : null,
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

export const onCoverChange = (event) => {
  const theCover = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theCover); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};
