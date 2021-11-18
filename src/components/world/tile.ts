import { Container, Sprite } from "pixi.js";
import { game } from "../..";
import { NPC, npcInterface } from "../npc/npc";
import { Building, buildingInterface } from "./building";
import { dirtTexture, grassTexture, mountainTexture, rangeHighlight, sandTexture, stoneTexture, waterTexture } from "../util/textures";
import { Node, nodeInterface } from "./node";

class Tile {
  x: number;
  y: number;
  q: number;
  r: number;
  sprite: Sprite;
  highlightSprite: Sprite;
  isHighlighted:boolean;
  npc?: NPC;
  building?: Building;
  node?: Node;
  isEmpty: boolean;

  constructor(x: number, y: number, biome: number, elevation:number, container: Container) {
    this.x = x;
    this.y = y;
    this.q = x - (y - (y&1)) / 2;
    this.r = y;
    this.sprite = this.handleSprite(biome);

    this.highlightSprite = Sprite.from(rangeHighlight);
    this.isHighlighted = false;

    this.highlightSprite.visible = false; //Make invisible until selected tile
    

    this.sprite.interactive = true;
    this.sprite.on("mousedown", () => game.world.setCurrent(this.x, this.y));

    container.addChild(this.sprite);
    this.isEmpty = true;
  }

  emptyCheck() {
    if (
      this.npc === undefined &&
      this.building === undefined &&
      this.node === undefined
    ) {
      this.isEmpty = true;
    } else this.isEmpty = false;
  }

  toggleHighlight(bool:boolean){
    this.isHighlighted = bool;
    this.highlightSprite.visible = bool;
  }

  addNPC(x: number, y: number, type: npcInterface, name: string) {
    this.emptyCheck();
    if (!this.isEmpty) return;

    this.npc = new NPC(x, y, type, name);
    game.world.npcMap.set(this.npc.id, this.npc);

    this.emptyCheck();
  }

  addBuilding(x: number, y: number, type: buildingInterface) {
    this.emptyCheck();
    if (!this.isEmpty) return;

    this.building = new Building(x, y, type);
    game.world.buildMap.set(this.building.id, this.building);

    this.emptyCheck();
  }

  addNode(x: number, y: number, type: nodeInterface, amount: number) {
    this.emptyCheck();
    if (!this.isEmpty) return;

    this.node = new Node(x, y, type, amount);

    this.emptyCheck();
  }

  render() {
    if (this.isEmpty) return;
    if (this.npc !== undefined) {
      let npc: NPC | undefined = this.npc;
      if (npc !== undefined) {
        npc.render(this.sprite.x, this.sprite.y);
      }
    }
    if (this.building !== undefined) {
      let build: Building | undefined = this.building;
      if (build !== undefined) {
        build.render(this.sprite.x, this.sprite.y);
      }
    }
    if (this.node !== undefined) {
      let node: Node | undefined = this.node;
      if (node !== undefined) {
        node.render(this.sprite.x, this.sprite.y);
      }
    }
  }

  handleSprite(biome: number) {
    if (biome < -0.2) {
      return Sprite.from(waterTexture);
    } else if(biome < 0.1) {
      return Sprite.from(sandTexture);
    } else if(biome < 0.6){
      return Sprite.from(grassTexture)
    } else if (biome < 0.7){
      return Sprite.from(stoneTexture)
    }
    
    else{
      return Sprite.from(mountainTexture)
    }
  }
}

export { Tile };
