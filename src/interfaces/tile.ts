import { Sprite } from "pixi.js";

interface TileInterface {
  x:number,//X coord
  y:number,//Y coord
  hasVillager:boolean,
  sprite?:Sprite,
}


export{
  TileInterface,
}