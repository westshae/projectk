import { Sprite } from "pixi.js"
import { villagerTexture } from "../../util/textures"
import { npcType } from "./npc"

let villager:npcType =  {
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