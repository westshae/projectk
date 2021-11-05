import { Sprite } from 'pixi.js';
import { houseTexture, mineTexture } from '../components/util/textures';
import { buildingInterface } from '../components/world/building';

let townCenter: buildingInterface = {
  health: 20,
  defense: 0,
  type: 0,
  buildTurns: 2,
  sprite: Sprite.from(houseTexture),
};

let mine: buildingInterface = {
  health: 10,
  defense: 0,
  type: 2,
  buildTurns: 5,
  sprite: Sprite.from(mineTexture),
};

let farm: buildingInterface = {
  health: 10,
  defense: 0,
  type: 2,
  buildTurns: 5,
  sprite: Sprite.from(mineTexture),
};

let sentryTower: buildingInterface = {
  health: 10,
  defense: 0,
  type: 2,
  buildTurns: 5,
  sprite: Sprite.from(mineTexture),
};

export { townCenter, mine };
