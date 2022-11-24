// navbar 스크롤

window.addEventListener("scroll", function () {
    if (window.scrollY < 200) {
        document.querySelector(".navbar-brand").style.fontSize = "28px";
        // document.querySelector(".logo-icon").style.fontSize = "24px";
        // document.querySelector(".navbar-brand").style.display = "block";

    }
    else {
        // document.querySelector(".navbar-brand").style.display = "none";
        // document.querySelector("#logo-title").style.display = "none";

        document.querySelector(".navbar-brand").style.fontSize = "24px";
        // document.querySelector(".logo-icon").style.fontSize = "18px";
    }

});




// 이미지 수정

const img = document.querySelector('.profile-img1');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');


file.addEventListener('change', function () {

    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);


    }
});



function 이미지제거() {
    const img = document.querySelector('.profile-img1');
    img.setAttribute('src', "../img/noimage.jpeg");
    // $(".profile-img2").attr("src", "../img/noimage.jpeg");
    // $('.profile-img2').show()
    // $('.profile-img1').hide()

}



// 해시태그

$(document)
    .ready(function () {

        var tag = {};
        var counter = 0;
        console.log(counter)
        // 태그를 추가한다.
        function addTag(value) {
            tag[counter] = value; // 태그를 Object 안에 추가
            counter++; // counter 증가 삭제를 위한 del-btn 의 고유 id 가 된다.
        }

        // 최종적으로 서버에 넘길때 tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
        function marginTag() {
            return Object.values(tag)
                .filter(function (word) {
                    return word !== "";
                });
        }

        $("#tag")
            .on("keyup", function (e) {
                var self = $(this);
                console.log("keypress");

                // input 에 focus 되있을 때 엔터 및 스페이스바 입력시 구동
                if (e.key === "Enter" || e.keyCode == 32) {

                    var tagValue = self.val(); // 값 가져오기

                    // 값이 없으면 동작 안합니다.
                    if (tagValue !== "") {

                        // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
                        var result = Object.values(tag)
                            .filter(function (word) {
                                return word === tagValue;
                            })

                        // 태그 중복 검사
                        if (result.length == 0) {
                            $("#tag-list")
                                .append("<li class='tag-item'>" + tagValue + "<span class='del-btn' idx='" + counter + "'>x</span></li>");
                            addTag(tagValue);
                            self.val("");
                        } else {
                            alert("태그값이 중복됩니다.");
                        }
                    }
                    e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
                }
            });

        // 삭제 버튼
        // 삭제 버튼은 비동기적 생성이므로 document 최초 생성시가 아닌 검색을 통해 이벤트를 구현시킨다.
        $(document)
            .on("click", ".del-btn", function (e) {
                var index = $(this)
                    .attr("idx");
                tag[index] = "";
                $(this)
                    .parent()
                    .remove();
            });
    })