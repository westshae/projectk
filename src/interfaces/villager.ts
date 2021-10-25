import { Sprite } from "pixi.js";

interface VillagerInterface {
  id:number,
  name:string,
  x:number,
  y:number,
  sprite?:Sprite,
}

export{
  VillagerInterface,
}