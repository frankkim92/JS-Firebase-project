// navbar 스크롤

window.addEventListener("scroll", function () {
    if (window.scrollY < 100) {
        document.querySelector(".navbar-brand").style.fontSize = "28px";
    } else {
        document.querySelector(".navbar-brand").style.fontSize = "18px";

    }
});


document.querySelector('.team-btn').addEventListener('click', function () {
    window.scrollTo(0, 742)
})









// // // // 스크롤 될 때마다 아래의 기능이 실행됨
// $(window).scroll(function () {


//     //     // 우선 높이(현재스크롤바의높이)를 먼저 구해보자
//     var 높이 = $(window).scrollTop();
//     console.log(높이);

//     var y = -0.002 * 높이 + 2.3;
//     $('.box').eq(0).css('opacity', y)

//     var y1 = -0.0002 * 높이 + 1.13;
//     $('.box').eq(0).css('transform', `scale( ${y1} )`);




//     var z = -0.002 * 높이 + 4.16;
//     $('.box2').eq(1).css('opacity', z)

//     var z1 = -0.0002 * 높이 + 1.316;
//     $('.box2').eq(1).css('transform', `scale( ${z1} )`);



//     var t = -0.002 * 높이 + 6.16;
//     $('.box2').eq(2).css('opacity', t)

//     var t1 = -0.0002 * 높이 + 1.49;
//     $('.box2').eq(2).css('transform', `scale( ${t1} )`);





// });