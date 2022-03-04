import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus
      .on(_,'burgerClick')
      .on(_,'changeHowItem')
      .on(_,'locationFilter')
      .on(_,'prevReview')
      .on(_,'nextReview')
      .on(_,'prevCase')
      .on(_,'nextCase')
      .on(_,'caseDot')
      .on(_,'createOrderSuccess')
      .on(_,'createOrderFail');
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

  changeActiveDot(slider,toNext = true) {
    let
      dots = slider.querySelector('.slider-dots'),
      activeDot = dots.querySelector('.active');
    activeDot.classList.remove('active');
    if (!toNext) {
      if (activeDot.previousElementSibling) {
        activeDot.previousElementSibling.classList.add('active')
      } else {
        dots.lastElementChild.classList.add('active')
      }
    } else {
      if (activeDot.nextElementSibling) {
        activeDot.nextElementSibling.classList.add('active')
      } else {
        dots.firstElementChild.classList.add('active')
      }
    }
  }
  prevCase(clickData){
    const _ = this;
    if (_.animation) return;
    _.animation = true;
    let
      btn = clickData.item,
      slider = btn.closest('.slider'),
      slides = slider.querySelector('.slides');
    slides.prepend(slides.lastElementChild);
    _.changeActiveDot(slider,false);
    setTimeout(function (){
      _.animation = false;
    },350)
  }
  nextCase(clickData){
    const _ = this;
    if (_.animation) return;
    _.animation = true;
    let
      btn = clickData.item,
      slider = btn.closest('.slider'),
      slides = slider.querySelector('.slides');
    slides.append(slides.firstElementChild);
    _.changeActiveDot(slider);
    setTimeout(function (){
      _.animation = false;
    },350)
  }
  caseDot(clickData){
    const _ = this;
    let btn = clickData.item;
    if (btn.classList.contains('active')) return;
    if (_.animation) return;
    _.animation = true;
    let
      position = parseInt(btn.getAttribute('data-position')),
      activeBtn = btn.parentElement.querySelector('.active'),
      prevPos = parseInt(activeBtn.getAttribute('data-position')),
      count = position - prevPos,
      slider = btn.closest('.slider'),
      slides = slider.querySelector('.slides');
    if (count < 0) {
      count = slides.children.length + count;
    }
    for (let i = 0; i < count; i++) {
      slides.append(slides.firstElementChild)
    }
    activeBtn.classList.remove('active');
    btn.classList.add('active');
    setTimeout(function (){
      _.animation = false;
    },350)
  }

  prevReview(clickData){
    let btn = clickData.item;
    if (btn.hasAttribute('disabled')) return;
    let
      slider = btn.closest('.slider'),
      slides = slider.querySelector('.slides'),
      position = parseInt(slider.getAttribute('data-position'));

    position--;
    slides.querySelectorAll('.slide').forEach(function (slide){
      slide.style = `transform:translateX(-${position * 100}%)`;
    })
    slider.setAttribute('data-position',position)

    if (position === 0) {
      console.log(position,btn)
      btn.setAttribute('disabled',true);
    }
    if (position < slides.children.length - 1) slider.querySelector('.slider-next').removeAttribute('disabled');
  }
  nextReview(clickData){
    let btn = clickData.item;
    if (btn.hasAttribute('disabled')) return;
    let
      slider = btn.closest('.slider'),
      slides = slider.querySelector('.slides'),
      position = parseInt(slider.getAttribute('data-position'));

    position++;
    slides.querySelectorAll('.slide').forEach(function (slide){
      slide.style = `transform:translateX(-${position * 100}%)`;
    })
    slider.setAttribute('data-position',position)

    if (position === slides.children.length - 1) btn.setAttribute('disabled',true);
    if (position !== 0) slider.querySelector('.slider-prev').removeAttribute('disabled');
  }

  changeHowItem(clickData){
    const _ = this;
    let btn = clickData.item;
    let i = parseInt(btn.getAttribute('data-cls'));
    let cont = btn.closest('.how');
    let btns = cont.querySelectorAll('.how-label');
    let unitConts = cont.querySelectorAll('.how-block');
    let another = 1 - i;
    btns[i].classList.add('active');
    btns[another].classList.remove('active');
    unitConts[another].classList.remove('active');
    setTimeout(function (){
      unitConts[i].style = 'position:relative;z-index:1;';
      unitConts[another].removeAttribute('style');
    },350)
    setTimeout(function (){
      unitConts[i].classList.add('active')
    },350)
  }

  headScroll(){
    let head = document.querySelector('.head');
    if (window.pageYOffset) {
      head.classList.add('scrolled')
    } else {
      head.classList.remove('scrolled')
    }
    window.addEventListener('scroll',()=>{
      if (window.pageYOffset) {
        head.classList.add('scrolled')
      } else {
        head.classList.remove('scrolled')
      }
    })
  }
  checkActivePage(){
    let links = document.querySelectorAll('.head .link');
    links.forEach(function (link){
      let pagePath = location.pathname;
      if (pagePath.length <= 1) return;
      let href = link.getAttribute('data-path');
      if (pagePath.indexOf(href) > 0) link.classList.add('active')
    })
  }

  burgerClick(){
    let head = document.querySelector('.head');
    if (head.classList.contains('active')) {
      head.classList.remove('active');
      document.body.removeAttribute('style');
    } else {
      head.classList.add('active');
      document.body.style = 'overflow:hidden;'
    }
  }

  locationFilter(clickData){
    const _ = this;
    let btn = clickData.item;
    let btns = btn.parentElement.children;
    let filterItems = document.querySelectorAll('.locations-item');
    let location = btn.getAttribute('data-location');
    for (let button of btns){
      if (button !== btn) button.classList.remove('active');
      else button.classList.add('active');
    }
    for (let item of filterItems) {
      if (!location || item.classList.contains(location)) item.classList.remove('hidden');
      else item.classList.add('hidden');
    }
  }

  rotateDegree(unit){
    let p = parseInt(unit.querySelector('.diagram-inner').textContent);

    let deg = Math.round(3.6*p);

    if (deg <= 180 && deg > 0) {
      unit.querySelector(".pieSlice1 .pie").style = "transform:rotate(" + deg + "deg)";
      unit.querySelector(".object.rotate").style = "transform:rotate(" + deg + "deg)";
    } else if (deg > 180 && deg <= 360) {
      unit.querySelector(".pieSlice1 .pie").style = "transform:rotate(180deg)";
      unit.querySelector(".pieSlice2 .pie").style = "transform:rotate(" + (deg - 180) + "deg)";
      unit.querySelector(".object.rotate").style = "transform:rotate(" + deg + "deg)";
    }
  }

  sliderInit(){
    let slider = document.querySelector('.cases .slider');
    if (!slider) return;
    let
      slides = slider.querySelector('.slides'),
      dots = slider.querySelector('.slider-dots');
    slides.prepend(slides.lastElementChild);
    if (window.innerWidth >= 1200) {
      slides.prepend(slides.lastElementChild);
    }
    let count = slides.children.length;
    for (let i = 0; i < count; i++) {
      let dot = document.createElement('BUTTON');
      dot.setAttribute('data-position',i);
      dot.setAttribute('data-click-action','front:caseDot');
      dot.className = 'dot';
      dots.append(dot);
      if (i === 0) dot.classList.add('active');
    }
  }

  init(){
    const _ = this;
    _.headScroll();
    _.checkActivePage();
    let diagrams = document.querySelectorAll('.diagram');
    diagrams.forEach(function (diagram){
      _.rotateDegree(diagram);
    })
    _.sliderInit();
  }
}
new Front();
