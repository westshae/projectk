import { Sprite } from "pixi.js"
import { houseTexture } from "../../util/textures"
import { mineTexture } from "../../util/textures"
import { buildingType } from "./building"

let townCenter:buildingType =  {
  health: 20,
  defense: 0,
  type: 0,
  buildTurns: 2,
  sprite: Sprite.from(houseTexture),
}

let mine:buildingType = {
    health: 10,
    defense: 0,
    type: 2,
    buildTurns: 5,
    sprite: Sprite.from(mineTexture),
}

let farm:buildingType = {
  health: 10,
  defense: 0,
  type: 2,
  buildTurns: 5,
  sprite: Sprite.from(mineTexture),
}

let sentryTower:buildingType = {
  health: 10,
  defense: 0,
  type: 2,
  buildTurns: 5,
  sprite: Sprite.from(mineTexture),
}





export{
  townCenter, 
  mine,
}