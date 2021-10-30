import { Container, Graphics, Renderer } from "pixi.js";
import { app } from "../..";


class HUD {
  container:Container;
  bar:Graphics;
  button:Graphics;

  constructor(){
    this.container = new Container();
    this.bar = new Graphics();
    this.button = new Graphics();
    this.init();
  }

  init(){
    app.stage.addChild(this.container);

    this.draw();
    window.addEventListener('resize', ()=>{
      this.draw();
    })

    this.container.addChild(this.bar);
    this.container.addChild(this.button);
  }

  draw(){
    let width = app.renderer.width;
    let height = app.renderer.height/16;

    this.drawButton(height);
    this.drawBar(width, height);

    this.container.removeChildren();
    
  }

  drawBar(width:number, height:number){
    this.bar.beginFill(0x434343);
    this.bar.drawRect(0,0,width, height);
  }

  drawButton(height:number){
    this.button.beginFill(0x900000);
    this.button.drawStar(height/2,height/2,5,height/2);
    this.button.interactive = true;
    this.button.on("mousedown", () => alert("ree"));

    this.button.zIndex = 100;
  }


}

export{
  HUD,
}