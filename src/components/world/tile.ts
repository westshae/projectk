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
  isHighlighted:boolean;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
    this.hasVillager = false;
    this.isHighlighted = false;
    this.villagers = [];
    this.sprite = Sprite.from(hexagonTexture);

    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleClick(event:any){
    console.log(this.x + ":" + this.y);
    this.isHighlighted = !this.isHighlighted;
    console.log(this.isHighlighted);
  }
}

export{
  Tile,
}