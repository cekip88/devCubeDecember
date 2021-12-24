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
      .on(_,'createOrderSuccess')
      .on(_,'createOrderFail');
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

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

  init(){
    const _ = this;
    _.headScroll();
    _.checkActivePage();
  }
}
new Front();
