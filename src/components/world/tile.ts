import { Container, Sprite } from 'pixi.js';
import { game } from '../..';
import { NPC, npcInterface } from '../npc/npc';
import { Building, buildingInterface } from './building';
import { dirtTexture, sandTexture } from '../util/textures';
import { Node, nodeInterface } from './node';

class Tile {
  x: number;
  y: number;
  sprite: Sprite;
  npc?: NPC;
  building?: Building;
  node?: Node;

  constructor(x: number, y: number, noise: number, container: Container) {
    this.x = x;
    this.y = y;
    this.sprite = this.handleSprite(noise);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on('mousedown', () => game.world.setCurrent(this.x, this.y));

    container.addChild(this.sprite);
  }

  addNPC(x: number, y: number, type: npcInterface, name: string){
    this.npc = new NPC(x, y, type, name);
    game.world.npcMap.set(this.npc.id, this.npc);
  }

  addBuilding(x: number, y: number, type: buildingInterface){
    this.building = new Building(x, y, type);
    game.world.buildMap.set(this.building.id, this.building);
  }

  addNode(x: number, y: number, type: nodeInterface, amount:number){
    this.node = new Node(x, y, type, amount);
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
