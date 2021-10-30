import { Tile } from "./tile";
import SimplexNoise from "../../../node_modules/simplex-noise/dist/cjs/simplex-noise";
import { NPC, npcType } from "../npc/npc";
import { Container } from "pixi.js";

class World {
  container:Container;
  grid:Array<Array<Tile>>;
  size:number;
  screenSize:number;
  npcMap:Map<number, NPC>;
  current?:NPC;

  constructor(size:number){
    this.size = size;
    this.screenSize = ((Math.sqrt(3) * 50) * size) * 5;
    this.grid = this.generateGrid();
    this.npcMap = new Map<number, NPC>();
    this.container = new Container();
  }

  addNPC(x:number, y:number, type:npcType, name:string){
    let npc:NPC = new NPC(x, y, type, name);
    let tile:Tile | undefined = this.grid.at(x)?.at(y);
    if(tile !== undefined){
      tile.npc = npc;
    }
    this.npcMap.set(npc.id, npc);
  }

  generateGrid(){
    let grid:Array<Array<Tile>> = [];
    const noise = new SimplexNoise(Math.random());//Generates noise map
    //https://www.redblobgames.com/maps/terrain-from-noise/

    for(let width:number = 0; width < this.size; width++){//For each required tile
      grid[width] = [];
      for(let height:number = 0; height < this.size; height++){
        grid[width][height] = new Tile(width, height, noise.noise2D(width/8, height/8));//Set spot in grid to new tile, with noise for biome
      }
    }
    return grid;
  }

  render(){
    let useOffset = false;//Changes between true and false, every time a now row is made.
    let heightOffset = 0;//Total change to affect the drawn height

    let size = 50;
    let width = Math.sqrt(3) * size;
    let height = 2 * size;

    this.grid.map((value, xindex)=>{//For each tile
      value.map((tile, yindex)=>{
        //Sets width/height of sprite from calculations
        tile.sprite.width = width;
        tile.sprite.height = height;

        if(useOffset){//If even line
          //Math to get hexagons correct placement
          tile.sprite.x = (tile.x * width) + (width/2);
          tile.sprite.y = (tile.y * height) - heightOffset;

          heightOffset += (height/2);

          if(yindex == this.size -1){
            heightOffset -= (height/4) * this.size;
          }
        }
        
        else{//If odd line
          //Math to get hexagons correct placement
          tile.sprite.x = (tile.x * width);
          tile.sprite.y = (tile.y * height) + (height/4) - heightOffset;
        }

        //If tile has npc, render it
        if(tile.npc !== undefined){
          let npc:NPC | undefined = tile.npc;
          if(npc !== undefined){
            npc.render(tile.sprite.x, tile.sprite.y);
          }
        }
        
        useOffset = !useOffset;
      })
    })
  }
}

export {
  World,
}