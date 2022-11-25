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
  const postList = document.getElementById("comment-list"); >> 카드 id로 바꿔야함
  const currentUid = authService.currentUser.uid;
  postList.innerHTML = "";
  // 붙여넣기전 기존것들 다 초기화(삭제)
  postObjList.forEach((postObj) => {
    const isOwner = currentUid === postObj.creatorId;
    const temp_html = `<div class="card">
    <div class="card-head">
      <img src="${postObj.coverInput}" />
    </div>
    <div class="card-body-wrapper">
      <div class="card-body-head">
        <h3 class="post-title">
          ${postObj.title}
        </h3>
        <div class="post-emoji">
          <img src="./image/happy.png">
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
          <img src="${postObj.profileImg}" class="footer-img" />
          <p class="card-p">by</p>
          <p class="card-p">${postObj.nickname ?? "닉네임 없음"}</p>
        </div>
        <p class="card-p">${new Date(postObj.createdAt)}</p>
      </div>
    </div>
  </div>`;
    
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });
};
