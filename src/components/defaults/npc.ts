import { Sprite } from 'pixi.js';
import { npcInterface } from '../npc/npc';
import { animalsTexture, villagerTexture } from '../util/textures';


let villager: npcInterface = {
  health: 10,
  attack: 5,
  defense: 4,
  id: 0,
  movement: 5,
  range: 5,
};

let chicken:npcInterface = {
  health: 9,
  attack: 4,
  defense: 3,
  id: 1,
  movement: 4,
  range: 5,
}

export { villager, chicken };
