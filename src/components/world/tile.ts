import { Container, Sprite } from "pixi.js";
import { game } from "../..";
import { NPC } from "../npc/npc";
import { dirtTexture, sandTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  sprite:Sprite;
  npc?:NPC;
  isHighlighted:boolean;

  constructor(x:number, y:number, noise:number, container:Container){
    this.x = x;
    this.y = y;
    this.isHighlighted = false;
    this.sprite = this.handleSprite(noise);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);

    container.addChild(this.sprite);
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
    if(game.world.current !== undefined){
      let npc:NPC = game.world.current;//Gets currently selected NPC

      //Sets npc's new coords
      npc.x = this.x;
      npc.y = this.y;

      this.npc = npc;//Sets current tile's npc to this npc
      
      game.world.current = undefined;//Resets selected npc;
    }
  }
}

export{
  Tile,
}