export const getFeedData = async (event) => {
  let postObjList = [];
  const id = event.target.id;
  const FeedRef = doc(db, "Writings", id);
  const FeedSnap = await getDoc(FeedRef);
  FeedSnap((doc) => {
    // console.log("doc.data():", doc.data());
    const FeedObj = {
      id: doc.id,
      ...doc.data(),
    };
  });

  const feedContent = document.getElementById("feed-content");
  const currentUid = authService.currentUser.uid;
  feedContent.innerHTML = "";

  (FeedObj) => {
    const isOwner = currentUid === FeedObj.creatorId;

    const temp_html = `<!-- 앨범커버 -->
    <div class="con_top">
      <p class="music_tit"><span class="icon_music"></span><span>정우</span> - <span>뭐든 될 수 있을 거야</span></p>
      <div class="img img_Square">
        <img draggable="false" src="../assets/my_x.jpeg" />
      </div>
    </div>
    <!-- 게시글 -->
    <div class="con_bottom">
      <div class="view_info">
        <div class="user_info">
          <div class="img profile_small">
            <img draggable="false" src="../assets/blankProfile.webp">
          </div>
          <p class="user_name">
            <span class="co_gray">by</span>
            <span class="user_id">정우와함께</span>
          </p>
        </div>
        <p class="write_date co_gray">Nov, 19</p>
      </div>
      <div class="card_list">
        <h3 class="list_tit tit_20">용기가 필요할 땐 이 노래를 들어..</h3>
        <p class="list_txt">뭐든 될 수 있을거야 듣고 진짜.. 광광 울었어요. 힘든 날 힘이되는 노래... 맨날 이것만 들어요.. 다들 한 번만 들어주세요!!
          뭐든 될 수 있을거야 듣고 진짜.. 광광 울었어요. 힘든 날 힘이되는 노래... 맨날 이것만 들어요.. 다들 한 번만 들어주세요!!</p>

        <ul class="tag_wrap">
          <li class="hash">#힐랭</li>
          <li class="hash">#사랑</li>
          <li class="hash">#정우최고</li>
        </ul>


      </div>
    </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    feedContent.appendChild(div);
  };
};

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
    // const cardId = event.target.id;
    // if ((FeedObj.id = cardId)) {
    //   FeedObjContent.push(FeedObj);
    // }

    FeedObjContent.push(FeedObj);
  });

  const feedContent = document.getElementById("feed-content");
  const currentUid = authService.currentUser.uid;
  feedContent.innerHTML = "";
  // console.log(FeedObjContent);

  FeedObjContent.forEach((FeedObj) => {
    const isOwner = currentUid === FeedObj.creatorId;

    const temp_html = `<!-- 앨범커버 -->
    <div class="con_top">
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
              FeedObj.profileImg ?? "/assets/blankProfile.webp"
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
    </div>`;

    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    feedContent.appendChild(div);
  });
};
