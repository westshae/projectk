import { Container } from "pixi.js";
import { app } from "../..";


class HUD {
  container:Container;

  constructor(){
    this.container = new Container();
    this.init();
  }

  init(){
    app.stage.addChild(this.container);
  }
}

export{
  HUD,
}