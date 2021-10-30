import { Container, Graphics } from "pixi.js";
import { app } from "../..";


class HUD {
  container:Container;

  constructor(){
    this.container = new Container();
    this.init();
  }

  init(){
    app.stage.addChild(this.container);

    let topHud = new Graphics();
    topHud.beginFill(0x434343);
    topHud.drawRect(0,window.innerHeight - 50,window.innerWidth, window.innerHeight);

    this.container.addChild(topHud);
  }
}

export{
  HUD,
}