import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus
      .on(_,'burgerClick')
      .on(_,'hireUs')
      .on(_,'createOrderSuccess')
      .on(_,'createOrderFail');
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

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
  hireUs(clickData){
    const _ = this;
    console.log(clickData)
  }

  init(){
    const _ = this;
    _.headScroll();
  }
}
new Front();
