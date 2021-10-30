import { villagerTexture } from "../util/textures";
import { Sprite } from "pixi.js";
import { npcType } from "./npc";

let Villager:npcType =  {
  health: 10,
  attack: 5,
  defense: 4,
  type: 0,
  sprite: Sprite.from(villagerTexture),
}

export{
  Villager,
}