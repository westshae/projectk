import { Sprite } from "pixi.js";
import { worldContainer } from "../..";
import { Villager } from "../npc/villager";
import { hexagonTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  hasVillager:boolean;
  sprite:Sprite;
  villagers:Array<Villager>;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
    this.hasVillager = false;
    this.villagers = [];
    this.sprite = Sprite.from(hexagonTexture);
    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleClick(){

  }
}

export{
  Tile,
}