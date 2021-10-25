import { Sprite } from "pixi.js";
import { worldContainer } from "../..";
import { hexagonTexture } from "../general/textures";


class Tile{
  x:number;
  y:number;
  width?:number;
  height?:number;
  hasVillager:boolean;
  sprite:Sprite;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
    this.hasVillager = false;
    // this.width = Math.sqrt(3) * size;
    // this.height = 2 * size;
    // this.width = width;
    // this.height = height;
    // this.width = 10;
    // this.height = 10;

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