import { Application, Container } from "pixi.js";
import { Resources } from "../data/resources";
import { HUD } from "../hud/hud";
import { World } from "../world/world";
import { displayInit } from "./display";

class Game{
  app:Application;
  world:World;
  resources:Resources;

  constructor(worldSize:number){
    this.app = new Application();
    this.world = new World(worldSize);//BREAKING HERE
    this.resources = new Resources();
  }

  init(){
    displayInit();//Initiates display
    
    //Init HUD
    const hud = new HUD();
    hud.init();
  }

  nextTurn(){
    console.log("NEXT TURN");
  }


}

export{
  Game,
}