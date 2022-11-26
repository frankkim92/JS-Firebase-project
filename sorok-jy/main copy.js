import { getDoc, collection, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
//오늘 날짜.
export const date = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
}); //"Tuesday, Nov 22, 2022"
export const today = document.querySelector(".date");
today.innerHTML = date;


document.querySelector('home').addEventListener('click',e=>{
  window.location = 'main.html';},



// 로그인, 회원가입 화면 토글링 기능

//
export const getCardList = async () => {
  let cardObjList = [];
  const q = query(
    //어떤 식으로 정렬해서 주세요. firestore api
    collection(dbService, "comments"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q); //document list
  //quertSnapshot의 매서드 forEach , 배열의 forEach가 아님
  querySnapshot.forEach((doc) => {
    //console.log("doc.data():", doc.data()),
    const cardObj = {
      id: doc.id,
      ...doc.data(),
    };
    cardObjList.push(cardObj);
  });
  const cardList = document.getElementByClassName("card");
  const currentUid = authService.currentUser.uid;
  cardtList.innerHTML = ""; //빈 문자열로 지움
  //배열의 forEach
  cardObjList.forEach((crdObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = ` <div class="content">
    <div class="card">${}</div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
  </div>`;

  const div = document.createElement("div");
  div.classList.add("mycards");
  div.innerHTML = temp_html;
  commnetList.appendChild(div);
});
};
    
    
    
  //  <div class="card commentCard">
  //         <div class="card-body">
  //             <blockquote class="blockquote mb-0">
  //                 <p class="commentText">${cmtObj.text}</p>
  //                 <p id="${
  //                   crdObj.id
  //                 }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
  //                 <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
  //                   crdobj.profileImg
  //                 }" alt="profileImg" /><span>${
  //     crdObj.nickname ?? "닉네임 없음"
  //   }</span></div><div class="cmtAt">${new Date(crdObj.createdAt)
  //     .toString()
  //     .slice(0, 25)}</div></footer>
  //             </blockquote>
  //             <div class="${isOwner ? "updateBtns" : "noDisplay"}">
  //                  <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
  //               <button name="${
  //                 crdObj.id
  //               }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
  //             </div>            
  //           </div>
  //    </div>`;
    //appendchild 를 사용하면 createElement 를 하나 더 만들고 넣어줘야함. 제이쿼리보다 한단계 더 거친다.
//     const div = document.createElement("div");
//     div.classList.add("mycards");
//     div.innerHTML = temp_html;
//     commnetList.appendChild(div);
//   });
// };
//


window.date = date;




