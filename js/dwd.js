
// 페이지 로드 후 우주선 이동 시작
document.addEventListener('DOMContentLoaded', () => {
  moveSpaceship();

  // 탭 바 초기화
  const tabbar = new TabBar("nav");

  // 타이핑 애니메이션
  new TypeIt("#simpleUsage", {
    strings: "최선을 다하도록 하겠습니다.",
    speed: 80,
    waitUntilVisible: true,
    lifeLike: true,
    loop: true,
  }).go();

});

class TabBar {
  /** Tab bar element */
  el;
  /**
   * @param el CSS selector for the tab bar
   */
  constructor(el) {
    this.el = document.querySelector(el);
    this.el?.setAttribute("data-pristine", "true");
    this.el?.addEventListener("click", this.switchTab.bind(this));
  }
  /**
   * Make the clicked tab active.
   * @param e Click event
   */
  switchTab(e) {
    // allow animations, which were prevented on load
    this.el?.removeAttribute("data-pristine");

    const target = e.target;
    const href = target.getAttribute("href");
    // target should be a link before assigning the “current” state
    if (href) {
      // remove the state from the current page…
      const currentPage = this.el?.querySelector(`[aria-current="page"]`);

      if (currentPage) {
        currentPage.setAttribute("aria-current", null);
      }
      // …and apply it to the next
      target.setAttribute("aria-current", "page");
    }
  }
}

// 우주선을 위로 이동시키는 함수
function moveSpaceship() {
  const spaceship = document.querySelector('.spaceship');
  let position = 0;
  const animationInterval = setInterval(() => {
    position += 10; // 우주선의 이동 속도 조정
    spaceship.style.bottom = position + 'px';
    if (position >= window.innerHeight) {
      clearInterval(animationInterval); // 애니메이션 종료
      // 페이지 전환 또는 다른 작업 수행
    }
  }, 50); // 애니메이션 간격 조정
}

//popup

const items = document.querySelectorAll('.gallery-collection li')
//여러개 적용할떄 querySelector뒤에 All을 붙인다.
const close = document.querySelector('.sdd') 
const popup = document.querySelector('.popup')


//foreach문
items.forEach((el, index)=>{
    el.addEventListener('mouseenter',()=>{
        el.querySelector('iframe').play()
    })
    el.onmouseleave = () => {
        el.querySelector('iframe').pause()
        el.querySelector('iframe').currentTime = '0'
    }
    el.addEventListener('click', ()=>{
        let title = el.querySelector('h3').innerText
        let text = el.querySelector('p').innerText
        let iframesrc = el.querySelector('iframe').getAttribute('src')

        popup.querySelector('.txt h2').innerText = title
        popup.querySelector('.txt p').innerText = text
        popup.querySelector('iframe').setAttribute('src', iframesrc)

        popup.classList.add('on')
        popup.querySelector('iframe').play()
    })
})

close.addEventListener('click', ()=>{
    popup.classList.remove('on')
    popup.querySelector('iframe').pause()
})

const headerEl = document.querySelector('header')

window.addEventListener('scroll',function(){
    //header가 active가 되는 효과!
    this.requestAnimationFrame(scrollCheck)
    //애니메이션 웹페이지를 원활하고 효율적으로 생성할 수 있도록!
})


function scrollCheck(){
  let browerScrollY = window.scrollY
  if(browerScrollY > 0){
      //herader active 클래스 추가
      headerEl.classList.add('active')
  }else{
      //herader active 클래스 삭제
      headerEl.classList.remove('active')
  }
}

// 메뉴 클릭하면 해당영역으로 이동하기
const animationMove = function(selector){
  const targetEl = document.querySelector(selector);
  const browerScrollY = window.scrollY;
  const targetScrollY = targetEl.getBoundingClientRect().top + browerScrollY
  window.scrollTo({ top: targetScrollY, behavior : 'smooth'})
  
}

// 스크롤 이벤트를 연결시키기
// button 에 data-* 속성으로 animation-scroll, target 속성 지정해놓은것

const scrollMove = document.querySelectorAll('[data-animation-scroll="true"]')
for(let i = 0; i < scrollMove.length; i++){
  // for(초기값; 범위; 증가;){ 반복할 문장 }
  scrollMove[i].addEventListener('click', function(){
      const target = this.dataset.target
      animationMove(target)
  })
}

//사이드메뉴

console.clear();

const nav = document.querySelector(".tkdl");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".link")];
const menuBtn = document.querySelector(".menu-btn");
const subMenuBtn = document.querySelector(".sub-menu-btn");

function createHoverEl() {
  let hoverEl = document.createElement("div");
  hoverEl.className = "hover-el";
  hoverEl.style.setProperty("--y", "0px");
  hoverEl.style.setProperty("--mousex", "0px");
  hoverEl.style.setProperty("--mousey", "0px");
  navLinksContainer.appendChild(hoverEl);
}
createHoverEl();

navLinks.forEach((link, index) => {
  let hoverEl = navLinksContainer.querySelector(".hover-el");
  link.style.setProperty("--delay", `${index * 50}ms`);
  link.addEventListener("mousemove", function(e) {
    hoverEl.style.setProperty("--y", `${index * 60}px`);
    hoverEl.style.setProperty("opacity", "1");
    hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
    hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
  });
  navLinksContainer.addEventListener("mouseout", function() {
    hoverEl.style.setProperty("opacity", "0");
  });
  link.addEventListener("click", function() {
    let hoverEl = navLinksContainer.querySelector(".hover-el");
    hoverEl.style.opacity = '0';
    toggleSubmenu(link);
  });
});

menuBtn.addEventListener("click", function() {
  nav.classList.toggle("nav-open");
  menuBtn.classList.toggle("close");
});
subMenuBtn.addEventListener("click", function() {
  nav.classList.toggle("sub-menu-open");
  removeSubmenu();
});

function toggleSubmenu(el) {
  let subMenu = nav.querySelector(".sub-menu");
  if (el.children[1]) {
    createSubmenu(el);
  } else if (nav.contains(subMenu)) {
    removeSubmenu();
  } else {
    return;
  }
}

function createSubmenu(el) {
  let subMenuContainer = document.createElement("div");
  subMenuContainer.className = "sub-menu";
  let subMenuItem = el.children[1].cloneNode(true);
  let subMenuItemList = [...subMenuItem.children];
  subMenuItemList.forEach((item, index) => {
    item.classList.add("off-menu");
    item.style.setProperty("--delay", `${index * 40}ms`);
  });
  nav.classList.toggle("sub-menu-open");
  nav.appendChild(subMenuContainer);
  subMenuContainer.appendChild(subMenuItem);
  setTimeout(function() {
    subMenuItemList.forEach(item => {
      item.classList.remove("off-menu");
      item.classList.add("on-menu");
    });
  }, 200);
}
function removeSubmenu() {
  let subMenu = nav.querySelector(".sub-menu");
  let subMenuItemList = [...subMenu.children[0].children];
  if (nav.contains(subMenu)) {
    subMenuItemList.forEach(item => {
      item.classList.add("off-menu");
      item.classList.remove("on-menu");
    });
    setTimeout(function() {
      nav.removeChild(subMenu);
    }, 500);
  }
}
//사이드메뉴 세부설정
const tkdlEl = document.querySelector('.tkdl')

window.addEventListener('scroll',function(){
    //header가 active가 되는 효과!
    this.requestAnimationFrame(scrollCheck)
    //애니메이션 웹페이지를 원활하고 효율적으로 생성할 수 있도록!
})

function scrollCheck(){
    let browerScrollY = window.scrollY
    if(browerScrollY > 500){
        //herader active 클래스 추가
        tkdlEl.classList.add('gog')
    }else{
        //herader active 클래스 삭제
        tkdlEl.classList.remove('gog')
    }
}
// 푸터

"use strict";

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
    
  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1400;

// Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  
  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
  var max = Math.max(x,y),
      diameter = Math.round(Math.sqrt(max*max + max*max));
  return diameter/2;
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w,h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 50000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#000000'; // 검은색 배경
    ctx.fillRect(0, 0, w, h)
  
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };  
  
  window.requestAnimationFrame(animation);
}

animation();
//타이핑 애니메이션
new TypeIt("#ssg", {
  strings: "앞으로도 더 성장해 나가도록 하겠습니다.",
  speed: 50,
  lifeLike: true,
  waitUntilVisible: true,
  loop: true,
}).go();

