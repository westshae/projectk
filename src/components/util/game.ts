import { Application } from "pixi.js";
import { Data } from "./data";
import { HUD } from "./hud";
import { World } from "../world/world";
import { displayInit } from "./display";

class Game{
  app:Application;
  world:World;
  data:Data;
  hud:HUD;

  constructor(worldSize:number){
    this.app = new Application();
    this.world = new World(worldSize);
    this.data = new Data();
    this.hud = new HUD();
  }

  init(){
    displayInit();//Initiates display
    this.hud.init();
  }

  nextTurn(){
    this.data.increaseResource(5, 1);//Increases turn count by 1

    this.world.npcMap.forEach((npc, key)=>{
      if(key !== undefined){

        npc.handleNextTurn();
        this.world.npcMap.set(npc.id, npc);

        let tile = this.world.grid.at(npc.x)?.at(npc.y);
        if(tile !== undefined){
          tile.npc = npc;
        }
      }
    })

  }
}

export{
  Game,
}