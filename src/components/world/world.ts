import { Tile } from "./tile";
import SimplexNoise from "../../../node_modules/simplex-noise/dist/cjs/simplex-noise";
import { NPC, npcInterface } from "../npc/npc";
import { Building, buildingInterface } from "./building";
import { Node, nodeInterface } from "./node";
import { Container, Sprite } from "pixi.js";
import { selectorTexture } from "../util/textures";
import { game } from "../..";
import { townCenter } from "../defaults/builds";

class World {
  container: Container;
  grid: Array<Array<Tile>>;
  size: number;
  screenSize: number;
  npcMap: Map<number, NPC>;
  buildMap: Map<number, Building>;
  currentTile?: Tile;
  selector: Sprite;
  buildMode: boolean;
  currentInteraction?: number;
  spriteWidth: number;
  spriteHeight: number;

  constructor(size: number) {
    this.size = size;
    this.spriteWidth = Math.sqrt(3) * 50;
    this.spriteHeight = 2 * 50;

    this.container = new Container();
    this.screenSize = this.spriteWidth * size * 5;
    this.grid = this.generateGrid();
    this.npcMap = new Map<number, NPC>();
    this.buildMap = new Map<number, Building>();

    this.buildMode = false;
    this.selector = Sprite.from(selectorTexture);
    this.createSelector();
  }

  createSelector() {
    this.selector.width = this.spriteWidth;
    this.selector.height = this.spriteHeight;

    this.selector.visible = false; //Make invisible until selected tile
    this.container.addChild(this.selector); //Adds to world container
  }

  addNPC(x: number, y: number, type: npcInterface, name: string) {
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile === undefined) return;
    tile.addNPC(x, y, type, name);
  }

  addBuilding(x: number, y: number, type: buildingInterface) {
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile === undefined) return;

    tile.addBuilding(x, y, type);
  }

  addNode(x: number, y: number, type: nodeInterface, amount: number) {
    let tile: Tile | undefined = this.grid.at(x)?.at(y);

    if (tile === undefined) return;
    tile.addNode(x, y, type, amount);
  }

  setCurrent(x: number, y: number) {
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile === undefined) return;

    if(this.currentTile === undefined){
      if(tile.isEmpty)return;
      this.setAction(tile);
    }else{
      tile.emptyCheck();
      if (tile.isEmpty) this.handleMovement(tile);

      if (this.buildMode) {
        if (tile.building !== undefined) {
          //Interact with building
        } else {
          //Create building
          this.handleBuild(tile);
        }
      } else {
        if (tile.npc !== undefined) this.handleAttack(tile);
        if (tile.node !== undefined) this.handleInteraction(tile);
      }
      switch (this.currentInteraction) {
            case 0:
              this.handleMovement(tile);
            case 1:
              this.handleAttack(tile);
            case 2:
              this.handleBuild(tile);
            case 3:
              this.handleInteraction(tile);
          }
    }

    // if(this.currentInteraction === undefined){
    //   this.setAction(tile);
    // }else{
    //   console.log(this.currentTile)
    //   console.log(tile);
    //   switch (this.currentInteraction) {
    //     case 0:
    //       this.handleMovement(tile);
    //     case 1:
    //       this.handleAttack(tile);
    //     case 2:
    //       this.handleBuild(tile);
    //     case 3:
    //       this.handleInteraction(tile);
    //   }
    // }

    // if (this.currentInteraction === undefined) {
      // this.setAction(tile);

      // tile.emptyCheck();
      // if (tile.isEmpty) this.currentInteraction = 0;

      // if (this.buildMode) {
      //   if (tile.building !== undefined) {
      //     //Interact with building
      //   } else {
      //     //Create building
      //     this.currentInteraction = 2;
      //   }
      // } else {
      //   if (tile.npc !== undefined) this.currentInteraction = 1;
      //   if (tile.node !== undefined) this.currentInteraction = 3;
      // }
    // } else {
      // console.log(this.currentInteraction)
      // switch (this.currentInteraction) {
      //   case 0:
      //     this.handleMovement(tile);
      //   case 1:
      //     this.handleAttack(tile);
      //   case 2:
      //     this.handleBuild(tile);
      //   case 3:
      //     this.handleInteraction(tile);
      // }
    // }

    // if (this.currentInteraction == undefined) {
    //   this.setAction(tile);
    // } else {
    //   switch (this.currentInteraction) {
    //     case 0:
    //       this.handleMovement(tile);
    //     case 1:
    //       this.handleAttack(tile);
    //     case 2:
    //       this.handleBuild(tile);
    //     case 3:
    //       this.handleInteraction(tile);
    //   }
    // }
  }

  setAction(tile: Tile) {
    this.currentTile = tile;
    this.selector.x = tile.sprite.x;
    this.selector.y = tile.sprite.y;
    this.selector.visible = true;

    if (this.currentTile?.npc !== undefined) {
      game.hud.toggleActionVisible(true);
    } else {
      game.hud.toggleActionVisible(false);
    }
  }

  resetAction() {
    this.currentTile = undefined;
    this.selector.visible = false;
    game.hud.toggleActionVisible(false);
    this.currentInteraction = undefined;
  }

  handleMovement(nextTile: Tile) {
    let currentTile: Tile | undefined = game.world.currentTile;

    if (nextTile.npc !== undefined) return;
    if (currentTile === undefined) return;

    let npc: NPC | undefined = currentTile.npc;
    if (npc === undefined) return;

    npc.move(currentTile, nextTile);
    this.resetAction();
  }

  handleAttack(tile: Tile) {
    let tileInit: Tile | undefined = game.world.currentTile;
    if (tileInit?.npc === undefined) return;

    let villager: NPC | undefined = tileInit.npc;
    let enemy: NPC | undefined = tile.npc;
    if (enemy === undefined) return;
    villager.doCombat(enemy);
    this.resetAction();
  }

  handleInteraction(tile: Tile) {
    let tileInit: Tile | undefined = game.world.currentTile;
    if (tileInit === undefined) return;
    if (tile.node === undefined) return;

    game.data.changeResource(tile.node.id, tile.node.amount, true);
    tile.node.delete();

    this.resetAction();
  }

  handleBuild(tile: Tile) {
    let tileInit: Tile | undefined = game.world.currentTile;
    if (tileInit === undefined) return;

    if (tile.building === undefined) {
      game.world.addBuilding(tile.x, tile.y, townCenter);
      game.world.render();
    } else {
      tile.building.delete();
    }

    this.resetAction();
  }

  generateGrid() {
    let grid: Array<Array<Tile>> = [];
    const noise = new SimplexNoise(Math.random());
    for (let width: number = 0; width < this.size; width++) {
      grid[width] = [];
      for (let height: number = 0; height < this.size; height++) {
        grid[width][height] = new Tile(
          width,
          height,
          noise.noise2D(width / 8, height / 8),
          this.container
        );
      }
    }
    return grid;
  }

  render() {
    for (let value of this.grid) {
      for (let tile of value) {
        tile.sprite.width = this.spriteWidth;
        tile.sprite.height = this.spriteHeight;

        let yindex = tile.y - 1;
        let heightOffset =
          (this.spriteHeight / 2) * (Math.round(yindex / 2) - 2);

        if (yindex % 2 == 0) {
          //If even lin
          tile.sprite.x = tile.x * this.spriteWidth + this.spriteWidth / 2;
          tile.sprite.y = yindex * this.spriteHeight - heightOffset;
        } else {
          //If odd line
          tile.sprite.x = tile.x * this.spriteWidth;
          tile.sprite.y =
            yindex * this.spriteHeight + this.spriteHeight / 4 - heightOffset;
        }

        tile.render();
      }
    }
  }
}

export { World };
