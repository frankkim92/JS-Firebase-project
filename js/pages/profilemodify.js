import {
  authService,
  storageService,
  dbService,
} from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
 
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import{
  addDoc,
  collection,
  query,
  getDocs
}from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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


    let tagList = []
    const tagTexts = document.querySelectorAll('.tagView')
    const introInput = document.getElementById("intro_txt");
    tagTexts.forEach((tag)=>{
      console.log(tag)
      const newTag= tag.textContent.substring(2,tag.textContent.length - 1)
      tagList.push(newTag);
    })
    
    try {
      await addDoc(collection(dbService, "profileInfor"), {
        tagInput:tagList,
        introTxt: introInput.value,
      });
     console.log(getProfileList())
    } catch (error) {
      alert(error);
      console.log("error in addDoc:", error);
    }

    
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

};

export const getProfileList = async() =>{
  //프로필 해쉬태그 + 간단한소개 저장
  let profileObjList = [];
  console.log(profileObjList)
  const q = query(
    collection(dbService, "profileInfor"),
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // console.log('doc.data()', doc.data())
    const profileInfoObj = {
      id: doc.id,
      ...doc.data(),
    };
    profileObjList.push(profileInfoObj);
  });

  const userInfoList = document.getElementById("userInfo");
  
  const currentUid = authService.currentUser.uid;
  userInfoList.innerHTML = "";
  profileObjList.forEach((profObj) => {
    const temp_html = `<div><h2 class="sub_tit"><span>${profObj.nickname ?? "닉네임 없음"}</span></h2>
    <div id="tag-list" class="tag_list">
     <div class="tagView">${profObj.tagInput}</div>
    </div>
    <div class="line_intro">
      <h3 class="sub_tit">한 줄 소개</h3>
      <p>${profObj.introTxt}</p>
    </div><div>`;
    const user_id = document.getElementById("userID").textContent = ``
    
    console.log('user_id', user_id)
    // console.log(profObj.introTxt)
    const div = document.createElement("div");
    div.classList.add("profil_txt");
    div.innerHTML = temp_html;
    userInfoList.appendChild(div);
  });
}

console.log(getProfileList())