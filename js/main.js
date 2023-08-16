/* 검색창 제어 */
//검색창 요소 찾기
const searchEl = document.querySelector('.search');
const searchInputEl = document.querySelector("input");
//검색창 요소를 클릭하면 실행
searchEl.addEventListener("click", () => {
    searchInputEl.focus();
})
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행
searchInputEl.addEventListener("focus", () => {
    // focus가 되었을때 div 태그에 focused가 추가
    searchEl.classList.add('focused');
    // 속성추가
    searchInputEl.setAttribute("placeholder", "통합검색");
})
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제되면 실행
searchInputEl.addEventListener("blur", () => {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute("placeholder", "");
})

/* 페이지 스크롤에 따른 요소 제어 
   스크롤 내리면 특정 시점에서 badge가 사라지도록*/
const badgeEl = document.querySelector('header .badges');
/* 페이지 스크롤에 영향을 받는 요소들을 검색 */
const toTopEl = document.querySelector('#to-top');

//스크롤은 윈도우에서 발생하는것이다.(뷰포트)
/* lodash : 인기 라이브러리 중 하나 함수가 자주 호출되는 것을 방지하기 위하여
    _. = lodash
    스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
 
window.addEventListener('scroll', _.throttle( ( ) => {
    if(window.scrollY > 500) {
        // badge 숨기기
        badgeEl.style.display = 'none';
    } else {
        badgeEl.style.display = 'block'
    }
}, 300)) // 300=0.3s
*/
/* gsap*/
window.addEventListener('scroll', _.throttle(() => {
    //페이지 스크롤 위치가 500px이 넘으면
    if (window.scrollY > 500) {
        //badge 요소 숨기기
        //gsap.to(요소, 지속시간, 옵션) opacity : 투명도
        gsap.to(badgeEl, .6, { opacity: 0, display: 'none' });
        //상단으로 스크르롤 버튼 보이기
        gsap.to(toTopEl, .2, { x:0})
    } else {
        gsap.to(badgeEl, .6, { opacity: 1, display: 'block' });
        //상단으로 스크르롤 버튼 숨기기
        gsap.to(toTopEl, .2, { x:100})
    }
}, 300))
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', _.throttle(()=>{
    gsap.to(window, .7, {
        scrollTo : 0
    })
}))
// starbucks-original-code
// toTopEl.addEventListener('click', function(){
//     gsap.to(window, .7, {
//         scrollTo : 0
//     })
// })

/* Visual Image를 순차적으로 나타나게 하는 기능
   이미지가 순차적으로 나타낼 수 있고 애니메이션이 자연스럽게 나올 수 있도록 */
// 나타날 요소들(.fade-in) 찾기
const fadeEls = document.querySelectorAll('.visual .fade-in');

// 나타날 요소들을 하나씩 반복해서 처리한다!
// 하나씩 꺼내서 가지고오려면 변수가 필요해!(el) 카운팅하는 변수(cnt)
fadeEls.forEach((el, cnt) => {
    // gsap을 이용해서 얼마동안 어떻게
    // gsap.to(요소, 지속시간, 옵션) opacity : 투명도 delay : 지연시간을 초단위로 설정
    gsap.to(el, 1, { opacity: 1, delay: (cnt + 1) * .7 });
})

/* swiper 슬라이드 요소 관리 */
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical', // 공지사항은 수직으로 올라감
    loop: true, // 계속 반복될 수 있게
    autoplay: true //자동으로 돌아감
})

new Swiper('.promotion .swiper-container', {
    direction: 'horizontal',
    slidesPerView: 3,
    loop: true,
    spaceBetween: 10,
    centeredSlides: true,
    // autoplay : { delay : 2000 },// 자동 재생여부 5초마다 슬라이드 바뀜
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable : true
    },

    // Navigation arrows 좌우 화살표
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    }
})
new Swiper('.awards .swiper-container', {
    autoplay :true,
    loop:true,
    spaceBetween:30,
    slidesPerView:5,
    navigation: {
        prevEl : 'awards .swiper-prev',
        nextEl : 'awards .swiper-next',
    }
})

/* PROMOTION TOGGLE */
// 슬라이드 영역 요소 검색
const promotionEl = document.querySelector(".promotion");
// 슬라이드 영역을 토글하는 버튼 검색
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 슬라이드 영역 숨김 여부 기본값
let isHidePromotion = false;
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', () => {
    if(isHidePromotion){
        //요소를 숨겨야 한다면,
        promotionEl.classList.add('hide');
        isHidePromotion = false;
    } else{
        // 요소가 보여야 한다면,
        promotionEl.classList.remove('hide');
        isHidePromotion = true;
    }
})
// 나머지는 css에서 .notice .promotion.hide{ height : 0}

/*======================================================================== */

/* 둥둥 떠다니는 효과 (부유floating하는 요소 관리)*/

// 수학 함수중에 MATH안 random이라는 함수가 있음 임의로 값을 뽑아낼때 사용한다.
// 0-1사이의 값
// if) console.log((Math.random() + (10-1)+1).toFixed(0));
// delay : parseInt((Math.random() * (delay-0)+0.).toFixed(2)),
// (10-1)+1 : 내가 원하는 범위 / toFixed(0)
// 문자열이 되기 때문에 parseInt 사용
function rand(min, max){
    return parseFloat((Math.random() + (max - min)+min).toFixed(2));
}
// 애니메이션을 줄 함수 (첫번째 이미지에 대한 접근자, 딜레이, 사이즈)
function floatingObject(selector, delay, size) {
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(selector, rand(1.5, 2.5), {
        y:size,
        repeat:-1, //무한반복
        yoyo : true, // 요요처럼 한 번 재생된 애니메이션을 반복함
        // delay에 랜덤함수를 주자
        delay: rand(0, delay),
        // ease는 애니메이션의 속도를 지정하는 옵션(속도 변화 움직임을 컨트롤하는 설정 값  )
        // GreenSock에서 옵션 확인 가능 , easeOut이 기본 옵션값
        ease : Power1.easeInOut
    })
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 * ScrollMagic으로 감시해야지
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  // new ScrollMagin.Scene().setClassToggle().addTO() === Chaining 기법
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      // triggerElement: 'class 또는 ID' 어떠한 객체에 스크롤이 닿으면 애니메이션이 발생할건지 지정
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    //.setClassToggle() 클래스를 넣었다 뺏다 제어
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

/* 올해가 몇 년도 인지 계산 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();


