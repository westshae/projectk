import { Sprite } from 'pixi.js';
import { npcInterface } from '../components/npc/npc';
import { villagerTexture } from '../components/util/textures';


let villager: npcInterface = {
  health: 10,
  attack: 5,
  defense: 4,
  id: 0,
  sprite: Sprite.from(villagerTexture),
  movement: 5,
};

export { villager };
