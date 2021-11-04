import { Sprite } from 'pixi.js';
import { houseTexture } from '../../util/textures';
import { mineTexture } from '../../util/textures';
import { nodeInterface } from './node';

const tree: nodeInterface = {
  processingTime: 2,
  defense: 0,
  type: 0,
  sprite: Sprite.from(houseTexture),
};

const ore: nodeInterface = {
  processingTime: 2,
  defense: 0,
  type: 1,
  sprite: Sprite.from(mineTexture),
};

const fruit: nodeInterface = {
  processingTime: 3,
  defense: 0,
  type: 2,
  sprite: Sprite.from(mineTexture),
};

export { tree, ore, fruit };
