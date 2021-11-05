import { Sprite } from 'pixi.js';
import { game } from '../..';
import {
  missingTexture,
  treeTexture,
  oreTexture,
  fruitTexture,
} from '../util/textures';
import { Tile } from './tile';

let recentID = 0;

interface nodeInterface {
  processingTime: number;
  defense: number;
  type: number;
  sprite: Sprite;
}

class Node {
  id: number;
  type: number;
  processingTime: number;
  sprite: Sprite;
  amount:number;
  x: number;
  y: number;

  constructor(x: number, y: number, type: nodeInterface, amount:number) {
    this.processingTime = type.processingTime;
    this.type = type.type;
    this.amount = amount;
    this.x = x;
    this.y = y;

    //Increases ID number by 1, then sets
    recentID++;
    this.id = recentID;

    this.sprite = this.handleSprite();
  }

  render(x: number, y: number) {
    //Calculates height/width of sprite
    this.sprite.width = game.world.spriteWidth * 0.8;
    this.sprite.height = game.world.spriteHeight * 0.8;

    this.sprite.x = x + this.sprite.width * 0.2;
    this.sprite.y = y;

    game.world.container.addChild(this.sprite);
  }

  delete() {
    this.sprite.destroy();
    let tile: Tile | undefined = game.world.grid.at(this.x)?.at(this.y);
    if (tile !== undefined) {
      tile.node = undefined;
    }
  }

  handleSprite() {
    switch (this.type) {
      case 0:
        return Sprite.from(treeTexture);
      case 1:
        return Sprite.from(oreTexture);
      case 2:
        return Sprite.from(fruitTexture);
      default:
        return Sprite.from(missingTexture);
    }
  }
}

export { Node, nodeInterface };
