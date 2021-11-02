import { Sprite } from "pixi.js";
import { missingTexture } from "../util/textures";
import { itemTypes } from "./items";

const sword:itemTypes =  {
  id:0,
  name:"Sword",
  sprite:Sprite.from(missingTexture),
  buffList:[
    {statID:0, amount:10}
  ]
}