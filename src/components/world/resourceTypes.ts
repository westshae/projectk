import { Sprite } from "pixi.js"
import { houseTexture } from "../util/textures"
import { mineTexture } from "../util/textures"
import { resourceType } from "./resource"

let tree:resourceType =  {
  processingTime: 2,
  defense: 0,
  type: 0,
  sprite: Sprite.from(houseTexture),
}

let ore:resourceType = {
    processingTime: 2,
    defense: 0,
    type: 1,
    sprite: Sprite.from(mineTexture),
}

let fruit:resourceType = {
  processingTime: 3,
  defense: 0,
  type: 2,
  sprite: Sprite.from(mineTexture),
}

export{
  tree,
  ore,
  fruit, 
}