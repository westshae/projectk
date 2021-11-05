import { Sprite } from 'pixi.js';
import { itemInterface } from '../npc/items';
import { missingTexture } from '../util/textures';


const sword: itemInterface = {
  id: 0,
  name: 'Sword',
  sprite: Sprite.from(missingTexture),
  buffList: [{ statID: 0, amount: 10 }],
};

export { sword };
