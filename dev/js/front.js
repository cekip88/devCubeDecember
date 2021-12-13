import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus
      .on(_,'createOrderSuccess')
      .on(_,'createOrderFail');
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}


}
new Front();
