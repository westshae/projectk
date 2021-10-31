import { Container, Graphics, Text } from "pixi.js";
import { game } from "../..";


class HUD {
  container:Container;
  bar:Graphics;
  button:Graphics;
  information:Container;

  constructor(){
    this.container = new Container();
    this.bar = new Graphics();
    this.button = new Graphics();
    this.information = new Container();
  }

  init(){//Added HUD to stage, added event for resizing, draws HUD
    game.app.stage.addChild(this.container);

    //Draws, then adds event for detecting resize
    this.draw();
    window.addEventListener('resize', ()=>{
      this.draw();
    })

    //Adds HUD element to container
    this.container.addChild(this.bar);
    this.container.addChild(this.button);
    this.container.addChild(this.information);
  }

  draw(){//Draws all HUD elements
    //Sets width and height of HUD
    let width = game.app.renderer.width;
    let height = game.app.renderer.height/16;

    //Draws elements
    this.drawButton(height);
    this.drawBar(width, height);
    this.drawInformation();
  }

  drawInformation(){
    this.information = new Container();
    this.information.x = 100;
    this.information.y = 10;
    let text = new Text(      
      this.makeText("level",game.data.level) + 
      this.makeText("exp",game.data.experience) +
      this.makeText("turn",game.data.turn) +
      this.makeText("lumber",game.data.lumber) +
      this.makeText("stone",game.data.stone) +
      this.makeText("metal",game.data.metal) 
    )
    this.information.addChild(text);
  }


  makeText(text:string, data:number){
    let value = text + ":" + data + "         ";
    return value;
  }

  drawBar(width:number, height:number){//Draws bar of HUD
    this.bar = new Graphics();

    this.bar.beginFill(0x434343);
    this.bar.drawRect(0,0,width, height);
  }

  drawButton(height:number){//Draws next turn button of HUD
    this.button = new Graphics();
    
    //Draws button
    this.button.beginFill(0x900000);
    this.button.drawStar(height/2,height/2,5,height/2);

    //Turns button into button
    this.button.interactive = true;
    this.button.on("pointerdown", () => game.nextTurn());

  }
}

export{
  HUD,
}