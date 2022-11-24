import {
  authService,
  storageService
} from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import {
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  v4 as uuidv4
} from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
  // event.preventDefault();
  if (event.code === "Enter") {
    event.preventDefault();
}
  document.getElementById("profileBtn").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;

  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    console.log('response', response)
    downloadUrl = await getDownloadURL(response.ref);
  }

  tagWrite()
  await updateProfile(authService.currentUser, {
      displayName: newNickname ? newNickname : null,
      photoURL: downloadUrl ? downloadUrl : null,
    })
    // tagWrite()
    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "#style";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
   
};


export const onFileChange = (event) => {
  console.log('event.taret.files:', event.target.files)
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};


export const imageRemove = async (event) => {
  const img = document.querySelector('#profileView');
  img.setAttribute('src', "/assets/blankProfile.webp");
}

export const tagWrite = (event) => {

  const tagInput = document.getElementById("tagName");
  const tagInputValue = tagInput.value;
  const tagList  = document.getElementById("tag-list")
  const tagText = document.createElement("p");
  tagText.textContent = `# ${tagInputValue} x`;
  tagInput.value = ''
  tagText.classList.add("tagView");

  const removeTag = () =>{
    tagList.removeChild(tagText)
  }

  tagText.addEventListener('click', removeTag)

  if(tagInputValue.keyCode == 13){
    tagList.appendChild(tagText)
  }
  if(tagList.childElementCount <= 2){
    tagList.appendChild(tagText)
  }else{
    return false
  }

  ㅠ
}

