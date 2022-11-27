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
import { dbService, authService } from "../firebase.js";

// ------------  피드 창 ------------
export const getFeedData = async (event) => {
  let FeedObjContent = [];

  const q = query(
    collection(dbService, "Writings"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log("doc.data():", doc.data());
    const FeedObj = {
      id: doc.id,
      ...doc.data(),
    };
    FeedObjContent.push(FeedObj);
  });

  const feedContent = document.getElementById("feed_top");
  const currentUid = authService.currentUser.uid;
  // 유저아이디 일치 확인 ----------------------
  feedContent.innerHTML = "";
  // console.log(FeedObjContent);

  FeedObjContent.forEach((FeedObj) => {
    const isOwner = currentUid === FeedObj.creatorId;
    // 유저아이디 일치 확인 ----------------------

    const temp_html = `<!-- 상단 타이틀 -->
    <div class="tit_wrap" id="${FeedObj.id}" >
      <div class=" tit_wrap_text">
        <span class="icon_arr"></span>
        <h2 class="main_tit">Feed</h2>
      </div>
      <div class="${isOwner ? " showBtns" : "noDisplay"}">
        <p id="${
          FeedObj.id
        }" class="tit_wrap_delete" onclick="deletePost(event)">삭제</p>
      </div>
    </div>
    <!-- 카드 데이터 -->
    <div id="feed-content">
      <!-- 앨범커버 -->
      <div class="con_top" id=${FeedObj.id}>
        <p class="music_tit"><span class="icon_music"></span><span>${
          FeedObj.artistName
        }</span> - <span>${FeedObj.songName}</span></p>
        <div class="img img_Square">
          <img draggable="false" src="${FeedObj.coverInput}" />
        </div>
      </div>
      <!-- 게시글 -->
      <div class="con_bottom">
        <div class="view_info">
          <div class="user_info">
            <div class="img profile_small">
              <img draggable="false" src="${
                FeedObj.profileImg ?? " /assets/blankProfile.webp"
              }">
            </div>
            <p class="user_name">
              <span class="co_gray">by</span>
              <span class="user_id">${FeedObj.nickname ?? "닉네임 없음"}</span>
            </p>
          </div>
          <p class="write_date co_gray">${new Date(FeedObj.createdAt)
            .toString()
            .slice(0, 4)}, ${new Date(FeedObj.createdAt)
      .toString()
      .slice(4, 8)}</p>
        </div>
        <div class="card_list">
          <h3 class="list_tit tit_20">${FeedObj.title}</h3>
          <p class="list_txt">${FeedObj.bodyText}</p>
          <ul class="tag_wrap">
            <li class="hash">#힐랭</li>
            <li class="hash">#사랑</li>
            <li class="hash">#정우최고</li>
          </ul>
        </div>
      </div>
    </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;

    const cardId = event.target.parentNode.parentNode.id;
    const FeedObjId = FeedObj.id;
    if (FeedObjId == cardId) {
      feedContent.appendChild(div);
    }

    // console.log(FeedObjId);
    // console.log(cardId);
  });
};

export const deletePost = async (event) => {
  event.preventDefault();
  const id = document.querySelector(".tit_wrap_delete").id;
  const ok = window.confirm("해당 게시글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "Writings", id));
      getPostList();
    } catch (error) {
      alert(error);
    }
  }
};

// ------------  댓글 리스트 ------------
export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("comment");
  const postId = document.querySelector(".tit_wrap").id;
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "comments"), {
      text: comment.value,
      createdAt: Date.now(),
      creatorId: uid, //수정, 삭제 컨트롤
      profileImg: photoURL,
      nickname: displayName,
      postId: postId,
    }).then(() => {
      alert("댓글 업로드 완료");
      // window.location.hash = "#fanLog";
    });

    comment.value = "";
    await getCommentList(event);
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
  console.log(
    "event.target.parentNode.children[0]",
    event.target.parentNode.children[0]
  );
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
      text: newComment,
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

export const getCommentList = async (event) => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, "comments"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  // console.log("querySnapshot", querySnapshot);
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
  });

  // const cardId = event.target.parentNode.parentNode.id;
  // const postcmtObj = cmtObjList.find((item) => item.postId == cardId);
  // const postcmtObj = cmtObjList.find((item) => item.postId == cardId);
  // console.log(cmtObjList.item);

  const filterArray = (array, fields, value) => {
    fields = Array.isArray(fields) ? fields : [fields];
    return array.filter((item) =>
      fields.some((field) => item[field] === value)
    );
  };
  const cardId = event.target.parentNode.parentNode.id;

  matchComments = filterArray(cmtObjList, "postId", cardId);
  console.log(matchComments);

  const commnetList = document.getElementById("feed_bottom");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";
  matchComments.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `<div class="comment_wrap">
    <div class="comment_user ">
      <div class="comment_id">
        <div class="img profile_small">
          <img draggable="false" src="${
            cmtObj.profileImg ?? " /assets/blankProfile.webp"
          }" alt="profileImg" />
        </div>
        <span class="user_id tit_20">${cmtObj.nickname ?? "닉네임 없음"}</span>
      </div>
      <span class="comment_date co_gray">${new Date(cmtObj.createdAt)
        .toString()
        .slice(0, 3)}, ${new Date(cmtObj.createdAt)
      .toString()
      .slice(8, 10)}</span>
    </div>
    <div>
      <p class="comment_txt">${cmtObj.text}</p>
      <p id="${
        cmtObj.id
      }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn"
          onclick="update_comment(event)">완료</button></p>
    </div>
    <div class="btn-Wrap ${isOwner ? " updateBtns" : "noDisplay"}">
      <button name="${
        cmtObj.id
      }" onclick="delete_comment(event)" class="btn deleteBtn btn_small btn_secondary">삭제</button>
      <button onclick="onEditing(event)" class="btn editBtn btn_small btn_default">댓글 수정</button>
    </div>
  </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);

    // const whereCommentId = cmtObj.postId;
    // if (whereCommentId === cardId) {
    //   commnetList.appendChild(div);
    // }
    // console.log(cmtObjList);
    // console.log(cmtObj);
    // console.log(cardId);
    // console.log(whereCommentId);
    // console.log(commnetList);

    let userDay = new Date(cmtObj.createdAt).toString().slice(0, 3);
    let userDate = new Date(cmtObj.createdAt).toString().slice(8, 10);

    const tmp = document.getElementById("today_date");
    tmp.innerText = `${userDay}, ${userDate}`;

    document
      .getElementById("commentImg")
      .setAttribute(`${cmtObj.profileImg ?? "/assets/blankProfile.webp"}`);
  });
};
