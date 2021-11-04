import { Sprite } from 'pixi.js';
import { missingTexture } from '../util/textures';
import { itemInterface } from './items';

const sword: itemInterface = {
  id: 0,
  name: 'Sword',
  sprite: Sprite.from(missingTexture),
  buffList: [{ statID: 0, amount: 10 }],
};

export { sword };
