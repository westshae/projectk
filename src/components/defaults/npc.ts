import { Sprite } from 'pixi.js';
import { npcInterface } from '../npc/npc';
import { villagerTexture } from '../util/textures';


let villager: npcInterface = {
  health: 10,
  attack: 5,
  defense: 4,
  id: 0,
  sprite: Sprite.from(villagerTexture),
  movement: 5,
  range: 5,
};

export { villager };
