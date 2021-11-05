import { Tile } from './tile';
import SimplexNoise from '../../../node_modules/simplex-noise/dist/cjs/simplex-noise';
import { NPC, npcInterface } from '../npc';
import { Building, buildingInterface } from './building';
import { Node, nodeInterface } from './node';
import { Container, Sprite } from 'pixi.js';
import { selectorTexture } from '../util/textures';
import { game } from '../..';
import { townCenter } from '../../defaults/builds';

class World {
  container: Container;
  grid: Array<Array<Tile>>;
  size: number;
  screenSize: number;
  npcMap: Map<number, NPC>;
  buildMap: Map<number, Building>;
  currentTile?: Tile;
  selector: Sprite;
  currentInteraction?: number;
  spriteWidth:number;
  spriteHeight:number;

  constructor(size: number) {
    this.size = size;
    this.spriteWidth = Math.sqrt(3) * 50;
    this.spriteHeight = 2 * 50;

    this.container = new Container();
    this.screenSize = this.spriteWidth * size * 5;
    this.grid = this.generateGrid();
    this.npcMap = new Map<number, NPC>();
    this.buildMap = new Map<number, Building>();

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
    let npc: NPC = new NPC(x, y, type, name);
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile !== undefined) {
      tile.npc = npc;
    }
    this.npcMap.set(npc.id, npc);
  }

  addBuilding(x: number, y: number, type: buildingInterface) {
    let build: Building = new Building(x, y, type);
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile !== undefined) {
      tile.building = build;
    }
    this.buildMap.set(build.id, build);
  }

  addNode(x: number, y: number, type: nodeInterface, amount:number) {
    let node: Node = new Node(x, y, type, amount);
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile !== undefined) {
      tile.node = node;
    }
  }

  setCurrent(x: number, y: number) {
    //Sets selected tile
    let tile: Tile | undefined = this.grid.at(x)?.at(y);
    if (tile !== undefined) {
      if (this.currentInteraction == undefined) {
        //If a interaction hasn't been selected
        this.currentTile = tile;
        this.selector.x = tile.sprite.x;
        this.selector.y = tile.sprite.y;
        this.selector.visible = true;
        this.handleAction();
      } else {
        //If an interaction has been selected, do interaction
        switch (this.currentInteraction) {
          case 0:
            this.handleMovement(tile);
            break;

          case 1:
            this.handleAttack(tile);
            break;

          case 2:
            this.handleBuild(tile);
            break;

          case 3:
            this.handleInteraction(tile);
            break;
        }
      }
    }
  }

  handleAction() {
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
    if(currentTile === undefined)return;
    
    let npc: NPC | undefined = currentTile.npc;
    if(npc === undefined) return;

    npc.move(currentTile, nextTile);
    this.resetAction();
  }

  handleAttack(tile: Tile) {
    let tileInit: Tile | undefined = game.world.currentTile;
    if (tileInit?.npc !== undefined) {
      let villager: NPC | undefined = tileInit.npc;
      let enemy: NPC | undefined = tile.npc;
      if (enemy !== undefined) {
        villager.doCombat(enemy);
      }
    }
    this.resetAction();
  }

  handleInteraction(tile: Tile) {
    let tileInit: Tile | undefined = game.world.currentTile;
    if(tileInit !== undefined){
      //Check distance
      if(tile.node !== undefined){
        game.data.increaseResource(tile.node.id, tile.node.amount);
        tile.node.delete();
      }
    }
    this.resetAction();
  }

  handleBuild(tile: Tile) {
    console.log('build');
    let tileInit: Tile | undefined = game.world.currentTile;
    if(tileInit !== undefined){
      //check distance
      if(tile.building === undefined){
        game.world.addBuilding(tile.x, tile.y, townCenter);
        game.world.render();
      }else{
        tile.building.delete();
      }
    }
    this.resetAction();
  }

  generateGrid() {
    let grid: Array<Array<Tile>> = [];
    const noise = new SimplexNoise(Math.random()); //Generates noise map
    //https://www.redblobgames.com/maps/terrain-from-noise/
    for (let width: number = 0; width < this.size; width++) {
      //For each required tile
      grid[width] = [];
      for (let height: number = 0; height < this.size; height++) {
        grid[width][height] = new Tile(
          width,
          height,
          noise.noise2D(width / 8, height / 8),
          this.container
        ); //Set spot in grid to new tile, with noise for biome
      }
    }
    return grid;
  }

  render() {
    let useOffset = false; //Changes between true and false, every time a now row is made.
    let heightOffset = 0; //Total change to affect the drawn height

    let size = 50;
    let width = Math.sqrt(3) * size;
    let height = 2 * size;

    this.grid.map((value, xindex) => {
      //For each tile
      value.map((tile, yindex) => {
        //Sets width/height of sprite from calculations
        tile.sprite.width = width;
        tile.sprite.height = height;

        if (useOffset) {
          //If even line
          //Math to get hexagons correct placement
          tile.sprite.x = tile.x * width + width / 2;
          tile.sprite.y = tile.y * height - heightOffset;

          heightOffset += height / 2;

          if (yindex == this.size - 1) {
            heightOffset -= (height / 4) * this.size;
          }
        } else {
          //If odd line
          //Math to get hexagons correct placement
          tile.sprite.x = tile.x * width;
          tile.sprite.y = tile.y * height + height / 4 - heightOffset;
        }

        //If tile has npc, render it
        if (tile.npc !== undefined) {
          let npc: NPC | undefined = tile.npc;
          if (npc !== undefined) {
            npc.render(tile.sprite.x, tile.sprite.y);
          }
        }
        //If tile has building, render it
        if (tile.building !== undefined) {
          let build: Building | undefined = tile.building;
          if (build !== undefined) {
            build.render(tile.sprite.x, tile.sprite.y);
          }
        }
        if (tile.node !== undefined) {
          let res: Node | undefined = tile.node;
          if (res !== undefined) {
            res.render(tile.sprite.x, tile.sprite.y);
          }
        }

        useOffset = !useOffset;
      });
    });
  }
}

export { World };
