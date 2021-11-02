import { Sprite } from "pixi.js";

interface itemTypes{
  id:number;
  name:string;
  sprite:Sprite;
  // buffList:Array<Object>;
}

let recentID = 0;


class Items{
  id:number;

  constructor(){
    recentID++;
    this.id = recentID;
  }
}

export {
  itemTypes,
  Items
}