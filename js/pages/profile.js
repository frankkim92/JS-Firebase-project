import {
  dbService,
} from "../firebase.js";

import {
  collection,
  query,
  getDocs,
  orderBy

} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";





export const getProfileList = async () => {
  //프로필 해쉬태그 + 간단한소개 저장
  let profileObjList = [];
  console.log(profileObjList)
  const q = query(
    collection(dbService, "profileInfor"),
    orderBy("createdAt", "desc")
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

  const userID = document.getElementById("userID");
  userID.textContent = profileObjList[0]?.nickname || "닉네임 없음";
  // console.log( profileObjList[0]?.nickname || "닉네임 없음")
 
  const tagInputs = profileObjList[0]?.tagInput || [];//나중에 공부..!

  tagInputs.forEach((inputs)=>{
    const span = document.createElement("span");
    span.classList.add('tagView');  
    span.innerHTML = inputs;
  //갯수가 3개 일때 보여주기를 멈춰라.
   if( document.querySelector('#tagViewList').childElementCount <= 2){
     document.querySelector('#tagViewList').appendChild(span);
   }
  })

  const line_txt = document.getElementById("line_txt");
  line_txt.innerText= profileObjList[0]?.introTxt || ''
  // console.log(profileObjList[0])
}
getProfileList()

export const changeModify = () =>{
  window.location.hash = "#profileModify";
}