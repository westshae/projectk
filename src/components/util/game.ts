import { Application, Container } from "pixi.js";
import { Data } from "../data/data";
import { HUD } from "../hud/hud";
import { World } from "../world/world";
import { displayInit } from "./display";

class Game{
  app:Application;
  world:World;
  data:Data;

  constructor(worldSize:number){
    this.app = new Application();
    this.world = new World(worldSize);//BREAKING HERE
    this.data = new Data();
  }

  init(){
    displayInit();//Initiates display
    
    //Init HUD
    const hud = new HUD();
    hud.init();
  }

  nextTurn(){
    this.data.turn++;

    this.world.npcMap.forEach((npc, key)=>{
      if(key !== undefined){
        console.log(npc);

        npc.handleNextTurn();
        this.world.npcMap.set(npc.id, npc);

        let tile = this.world.grid.at(npc.x)?.at(npc.y);
        if(tile !== undefined){
          tile.npc = npc;
        }
      }
    })
    console.log("END NEXTTURN");
  }


}

export{
  Game,
}