import { Container, Graphics, Text } from "pixi.js";
import { game } from "../..";
import { Data } from "./data";

class HUD {
  container: Container;
  bar: Graphics;
  button: Graphics;
  information: Container;
  action: Container;

  constructor() {
    this.container = new Container();
    this.bar = new Graphics();
    this.button = new Graphics();
    this.information = new Container();
    this.action = new Container();
  }

  init() {
    //Added HUD to stage, added event for resizing, draws HUD
    game.app.stage.addChild(this.container);

    //Draws, then adds event for detecting resize
    this.draw();
    window.addEventListener("resize", () => {
      this.draw();
    });

    //Adds HUD element to container
    this.container.addChild(this.bar);
    this.container.addChild(this.button);
    this.container.addChild(this.information);
    this.container.addChild(this.action);
  }

  draw() {
    //Draws all HUD elements
    //Sets width and height of HUD
    let width = game.app.renderer.width;
    let height = game.app.renderer.height / 16;

    //Draws elements
    this.drawButton(height);
    this.drawInformation();
  }

  drawInformation() {
    this.information.removeChildren();
    let values = [
     { name: "level", amount: game.data.level },
     { name: "exp", amount: game.data.experience}, 
     {name:"turn", amount:game.data.turn}, 
     {name:"lumber", amount:game.data.lumber}, 
     {name:"stone", amount:game.data.stone}, 
     {name:"metal", amount:game.data.metal},
    ];

    if(this.information.children.length < 5){
      for (let i = 0; i < 6; i ++) {
        let current = values.at(i);
        if(current === undefined) return;
        this.makeInformationBox(current?.name, current?.amount, i*25);
      }
    }
  }

  makeInformationBox(text: string, data: number, height: number) {
    let obj: Text = new Text(text + ":" + data);
    obj.y = height + 50;
    this.information.addChild(obj)
  }

  drawButton(height: number) {
    //Draws next turn button of HUD
    this.button = new Graphics();

    //Draws button
    this.button.beginFill(0x900000);
    this.button.drawStar(height / 2, height / 2, 5, height / 2);

    //Turns button into button
    this.button.interactive = true;
    this.button.on("pointerdown", () => game.nextTurn());
  }

  toggleActionVisible(visibility: boolean) {
    this.action.visible = visibility;
  }
}

export { HUD };
