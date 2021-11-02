import { Sprite } from "pixi.js"
import { villagerTexture } from "../../util/textures"
import { npcInterface } from "./npc"

let villager:npcInterface =  {
  health: 10,
  attack: 5,
  defense: 4,
  type: 0,
  sprite: Sprite.from(villagerTexture),
  movement: 5,
}

export{
  villager,
}