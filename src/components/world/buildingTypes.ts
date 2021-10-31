import { Sprite } from "pixi.js"
import { villagerTexture } from "../util/textures"
import { buildingType } from "./building"

let house:buildingType =  {
  health: 20,
  defense: 0,
  type: 0,
  sprite: Sprite.from(villagerTexture),
}

export{
  house,
}