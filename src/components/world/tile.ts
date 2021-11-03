import { Container, Sprite } from "pixi.js";
import { game } from "../..";
import { NPC } from "../npc/npc/npc";
import { Building } from "./building/building";
import { dirtTexture, sandTexture } from "../util/textures";
import { Node } from "./node/node";


class Tile{
  x:number;
  y:number;
  sprite:Sprite;
  npc?:NPC;
  building?:Building;
  resource?:Node;
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
    game.world.setCurrent(this);
    console.log(game.world.currentTile?.x + ":" + game.world.currentTile?.y);
  }
}

export{
  Tile,
}