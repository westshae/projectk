import { Sprite } from 'pixi.js';
import { game } from '../../..';
import { missingTexture, houseTexture, mineTexture } from '../../util/textures';
import { Tile } from '../tile';

let recentID = 0;

interface buildingInterface {
  health: number;
  defense: number;
  type: number;
  buildTurns: number;
  sprite: Sprite;
}

class Building {
  id: number;
  type: number;
  health: number;
  defense: number;
  buildTurns: number;
  sprite: Sprite;
  x: number;
  y: number;

  constructor(x: number, y: number, type: buildingInterface) {
    this.health = type.health;
    this.defense = type.defense;
    this.type = type.type;
    this.buildTurns = type.buildTurns;
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

    game.world.container.addChild(this.sprite); //Adds to world container
  }

  delete() {
    this.sprite.destroy();
    let tile: Tile | undefined = game.world.grid.at(this.x)?.at(this.y);
    if (tile !== undefined) {
      tile.building = undefined;
      game.world.buildMap.delete(this.id);
    }
  }

  handleSprite() {
    switch (this.type) {
      case 0:
        return Sprite.from(houseTexture);
      case 1:
        return Sprite.from(mineTexture);
      default:
        return Sprite.from(missingTexture);
    }
  }
}

export { Building, buildingInterface };
