import { Sprite } from 'pixi.js';
import { itemInterface } from '../npc/items';
import { missingTexture } from '../util/textures';
import { buffInterface } from '../npc/items';


const sword: itemInterface = {
  id: 0,
  name: 'Sword',
  sprite: Sprite.from(missingTexture),
  buffList: [{statID: 0, amount: 10 }],
};

const bearTrap: itemInterface = {
  id: 1,
  name: 'BearTrap',
  sprite: Sprite.from(missingTexture),
  buffList: [{statID: 0, amount: 2 }],
};

const wood: itemInterface = {
  id: 2,
  name: 'Wood',
  sprite: Sprite.from(missingTexture),
  buffList: [],
};

export { sword, bearTrap, wood };
