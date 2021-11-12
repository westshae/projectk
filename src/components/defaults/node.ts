import { Sprite } from 'pixi.js';
import { fruitTexture, houseTexture, mineTexture, oreTexture, treeTexture } from '../util/textures';
import { nodeInterface } from '../world/node';
import { wood } from '../defaults/items';

const tree: nodeInterface = {
  processingTime: 2,
  defense: 0,
  type: 0,
  sprite: Sprite.from(treeTexture),
  item: wood,
};

const ore: nodeInterface = {
  processingTime: 2,
  defense: 0,
  type: 1,
  sprite: Sprite.from(oreTexture),
};

const fruit: nodeInterface = {
  processingTime: 3,
  defense: 0,
  type: 2,
  sprite: Sprite.from(fruitTexture),
};

const chest: nodeInterface = {
  processingTime: 1,
  defense: 0,
  type: 3,
  sprite: Sprite.from(chestTexture),
};

export { tree, ore, fruit, chest };
