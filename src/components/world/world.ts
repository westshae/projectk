import { Villager } from "../npc/villager";
import { Tile } from "./tile";

class World {
  grid:Array<Array<Tile>>;
  width:number;
  height:number;
  villagers:Array<Villager>;

  constructor(width:number, height:number){
    this.width = width;
    this.height = height;
    this.grid = this.generateGrid();
    this.villagers = [];
  }

  generateGrid(){
    let grid:Array<Array<Tile>> = [];

    for(let width:number = 0; width < this.width; width++){//For each required tile
      grid[width] = [];
      for(let height:number = 0; height < this.height; height++){
        grid[width][height] = new Tile(width, height);//Set spot in grid to new tile
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
        tile.sprite.width = width;
        tile.sprite.height = height;

        if(useOffset){
          tile.sprite.x = (tile.x * width) + (width/2);
          tile.sprite.y = (tile.y * height) - heightOffset;

          heightOffset += (height/2);

          if(yindex == this.height -1){
            heightOffset -= (height/4) * this.height;
          }
        }
        
        else{
          tile.sprite.x = (tile.x * width);
          tile.sprite.y = (tile.y * height) + (height/4) - heightOffset;
        }

        useOffset = !useOffset;
      })
    })
  }
}

export {
  World,
}