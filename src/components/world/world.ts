import { Villager } from "../npc/villager";
import { Tile } from "./tile";
import SimplexNoise from "../../../node_modules/simplex-noise/dist/cjs/simplex-noise";

class World {
  grid:Array<Array<Tile>>;
  size:number;
  villagers:Array<Villager>;
  current?:Villager;

  constructor(size:number){
    this.size = size;
    this.grid = this.generateGrid();
    this.villagers = [];
  }

  addVillager(id:number, name:string, x:number, y:number){
    let villager:Villager = new Villager(id, name, x, y);
    let tile:Tile | undefined = this.grid.at(x)?.at(y);
    if(tile !== undefined){
      tile.hasVillager = true;
      tile.villager = villager;
    }
    this.villagers.push(villager);
  }

  generateGrid(){
    let grid:Array<Array<Tile>> = [];
    const noise = new SimplexNoise(Math.random());

    for(let width:number = 0; width < this.size; width++){//For each required tile
      grid[width] = [];
      for(let height:number = 0; height < this.size; height++){
        grid[width][height] = new Tile(width, height, noise.noise2D(width*24, height*24));//Set spot in grid to new tile
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

        //If tile has villager, render it
        if(tile.hasVillager){
          let villager:Villager | undefined = tile.villager;
          if(villager != undefined){
            villager.render(tile.sprite.x, tile.sprite.y);
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