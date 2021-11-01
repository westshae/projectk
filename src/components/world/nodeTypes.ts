import { Sprite } from "pixi.js"
import { houseTexture } from "../util/textures"
import { mineTexture } from "../util/textures"
import { nodeType } from "./node"

const tree:nodeType =  {
  processingTime: 2,
  defense: 0,
  type: 0,
  sprite: Sprite.from(houseTexture),
}

const ore:nodeType = {
    processingTime: 2,
    defense: 0,
    type: 1,
    sprite: Sprite.from(mineTexture),
}

const fruit:nodeType = {
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