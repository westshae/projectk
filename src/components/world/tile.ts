import { Container, Sprite } from 'pixi.js';
import { game } from '../..';
import { NPC } from '../npc';
import { Building } from './building';
import { dirtTexture, sandTexture } from '../util/textures';
import { Node } from './node';

class Tile {
  x: number;
  y: number;
  sprite: Sprite;
  npc?: NPC;
  building?: Building;
  node?: Node;
  isHighlighted: boolean;

  constructor(x: number, y: number, noise: number, container: Container) {
    this.x = x;
    this.y = y;
    this.isHighlighted = false;
    this.sprite = this.handleSprite(noise);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on('mousedown', () => game.world.setCurrent(this.x, this.y));

    container.addChild(this.sprite);
  }

  handleSprite(noise: number) {
    //Returns sprite based on noise value
    if (noise < 0) {
      return Sprite.from(sandTexture);
    } else {
      return Sprite.from(dirtTexture);
    }
  }
}

export { Tile };
