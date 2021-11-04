import { Container, Graphics, Text } from "pixi.js";
import { game } from "../..";


class HUD {
  container:Container;
  bar:Graphics;
  button:Graphics;
  information:Text;
  action:Container;

  constructor(){
    this.container = new Container();
    this.bar = new Graphics();
    this.button = new Graphics();
    this.information = new Text("");
    this.action = new Container();
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
    this.container.addChild(this.action);
  }

  draw(){//Draws all HUD elements
    //Sets width and height of HUD
    let width = game.app.renderer.width;
    let height = game.app.renderer.height/16;

    //Draws elements
    this.drawButton(height);
    this.drawBar(width, height);
    this.drawInformation();
    this.drawAction(height);
  }

  drawInformation(){
    let text = (
      this.makeText("level",game.data.level) + 
      this.makeText("exp",game.data.experience) +
      this.makeText("turn",game.data.turn) +
      this.makeText("lumber",game.data.lumber) +
      this.makeText("stone",game.data.stone) +
      this.makeText("metal",game.data.metal) 
    )

    this.information.text = text;
    this.information.x = 100;
    this.information.y = 10;
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

  drawAction(height:number){
    this.action.visible = false;
    let arrayOfFunction = [];
    arrayOfFunction.push(game.world.handleAttack);
    arrayOfFunction.push(game.world.handleBuild);
    arrayOfFunction.push(game.world.handleInteraction);
    arrayOfFunction.push(game.world.handleMovement);

    //draws background rectangle
    let bar = new Graphics();
    bar.beginFill(0x434343);
    bar.drawRect(0,game.app.renderer.height - height,height * 4, height);
    this.action.addChild(bar);


    for(let i = 0; i < 4; i++){
      let button = new Graphics();
    
      //Draws button
      button.beginFill(0x900000);
      button.drawStar((height/2) + (height * i),game.app.renderer.height - (height/2),5,height/2);

      //Turns button into button
      button.interactive = true;
      let current = arrayOfFunction.at(i);
      if(current !== undefined){
        button.on("pointerdown", current);
      }

      this.action.addChild(button);
    }
  }

  toggleActionVisible(){
    this.action.visible = true;
  }
}

export{
  HUD,
}