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
    
    console.log(this.world.npcMap);
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