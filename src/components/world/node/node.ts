import { Sprite } from 'pixi.js';
import { game } from '../../..';
import {
  missingTexture,
  treeTexture,
  oreTexture,
  fruitTexture,
} from '../../util/textures';

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
  defense: number;
  sprite: Sprite;
  x: number;
  y: number;

  constructor(x: number, y: number, type: nodeInterface) {
    this.processingTime = type.processingTime;
    this.defense = type.defense;
    this.type = type.type;
    this.x = x;
    this.y = y;

    //Increases ID number by 1, then sets
    recentID++;
    this.id = recentID;

    this.sprite = this.handleSprite();
  }

  render(x: number, y: number) {
    //Calculates height/width of sprite
    this.sprite.width = Math.sqrt(3) * 50 * 0.8;
    this.sprite.height = 2 * 50 * 0.8;

    this.sprite.x = x + this.sprite.width * 0.15;
    this.sprite.y = y;

    //Make tile interactable
    this.sprite.interactive = true;
    //this.sprite.on("pointerdown", this.select);

    game.world.container.addChild(this.sprite); //Adds to world container
  }

  select() {
    //Cannot select a building (yet)
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
