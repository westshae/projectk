import { Sprite } from "pixi.js";
import { world, worldContainer } from "../..";
import { NPC } from "../npc/npc";
import { Building } from "./building";
import { dirtTexture, grassTexture, mountainTexture, sandTexture, treeTexture, villagerTexture, waterTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  sprite:Sprite;
  npc?:NPC;
  building?:Building;
  isHighlighted:boolean;


  constructor(x:number, y:number, noise:number){
    this.x = x;
    this.y = y;
    this.isHighlighted = false;
    this.sprite = this.handleSprite(noise);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleSprite(noise:number){//Returns sprite based on noise value
    if(noise < 0){
      return Sprite.from(sandTexture);
    }
    else{
      return Sprite.from(dirtTexture);
    }
  }

  handleClick(){
    if(world.current !== undefined){
      let npc:NPC = world.current;//Gets currently selected NPC

      //Sets npc's new coords
      npc.x = this.x;
      npc.y = this.y;

      this.npc = npc;//Sets current tile's npc to this npc
      
      world.current = undefined;//Resets selected npc;
    }
  }
}

export{
  Tile,
}