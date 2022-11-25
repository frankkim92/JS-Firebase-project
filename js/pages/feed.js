import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  dbService,
  authService
} from "../firebase.js";


export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("comment");
  const {
    uid,
    photoURL,
    displayName,
  } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "comments"), {
      text: comment.value,
      createdAt: Date.now(),
      creatorId: uid, //수정, 삭제 컨트롤
      profileImg: photoURL,
      nickname: displayName,
    });
    comment.value = "";
    getCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody = event.target.parentNode.parentNode;
  const commentText = cardBody.children[1].children[1];
  const commentInputP = cardBody.children[1].children[1];

  commentText.classList.add("noDisplay");
  commentInputP.classList.add("d-flex");
  commentInputP.classList.remove("noDisplay");
  commentInputP.children[0].focus();
};

export const update_comment = async (event) => {
  event.preventDefault();
  const newComment = event.target.parentNode.children[0].value;
  console.log('event.target.parentNode.children[0]', event.target.parentNode.children[0])
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const commentText = parentNode.children[0];
  commentText.classList.remove("noDisplay");
  const commentInputP = parentNode.children[1];
  commentInputP.classList.remove("d-flex");
  commentInputP.classList.add("noDisplay");

  const commentRef = doc(dbService, "comments", id);
  try {
    await updateDoc(commentRef, {
      text: newComment
    });
    getCommentList();
  } catch (error) {
    alert(error);
  }
};

export const delete_comment = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "comments", id));
      getCommentList();
    } catch (error) {
      alert(error);
    }
  }
};

export const getCommentList = async () => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, "comments"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  console.log('querySnapshot', querySnapshot)
  querySnapshot.forEach((doc) => {
    console.log('doc.data()', doc.data())
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
  });
  const commnetList = document.getElementById("comment-list");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";
  cmtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = ` 
    <div class="comment_wrap">
      <div class="comment_user ">
        <div class="comment_id">
          <div class="img profile_small">
            <img draggable="false" src="${cmtObj.profileImg ?? "/assets/blankProfile.webp" }" alt="profileImg" />
          </div>
          <span class="user_id tit_20">${cmtObj.nickname ?? "닉네임 없음"}</span>
        </div>
        <span class="comment_date co_gray">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</span>
      </div>
    <div>
      <p class="comment_txt">${cmtObj.text}</p>
      <p id="${
        cmtObj.id
      }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
    </div>
    <div class="btn-Wrap ${isOwner ? "updateBtns" : "noDisplay"}">
      <button  name="${cmtObj.id}" onclick="delete_comment(event)" class="btn deleteBtn btn_small btn_secondary">삭제</button>
      <button onclick="onEditing(event)" class="btn editBtn btn_small btn_default">댓글 수정</button>
    </div>
  </div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });



let today = new Date().toDateString();   


const tmp  = document.getElementById('today_date')
tmp.innerText = `${today}`
console.log(tmp)

};