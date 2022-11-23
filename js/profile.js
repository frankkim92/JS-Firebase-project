// navbar 스크롤

window.addEventListener("scroll", function () {
    if (window.scrollY < 100) {
        document.querySelector(".navbar-brand").style.fontSize = "28px";
    } else {
        document.querySelector(".navbar-brand").style.fontSize = "18px";

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
    $(".profile-img2").attr("src", "../img/noimage.jpeg");
    $('.profile-img2').show()
    $('.profile-img1').hide()

}

