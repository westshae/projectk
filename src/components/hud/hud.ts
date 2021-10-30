import { Container, Graphics, Renderer } from "pixi.js";
import { app } from "../..";


class HUD {
  container:Container;

  constructor(){
    this.container = new Container();
    this.init();
  }

  init(){
    app.stage.addChild(this.container);

    let bar = new Graphics();
    this.draw(bar);
    window.addEventListener('resize', ()=>{
      this.draw(bar);
    })

    this.container.addChild(bar);
  }

  draw(bar:Graphics){
    let height = app.renderer.height/16;
    let width = app.renderer.width;
    bar.clear();
    bar.beginFill(0x434343);
    bar.drawRect(0,0,width, height);
    bar.beginFill(0x900000);
    bar.drawStar(height/2,height/2,5,height/2);
  }
}

export{
  HUD,
}