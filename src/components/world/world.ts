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

  addVillager(id:number, name:string, x:number, y:number){
    let villager:Villager = new Villager(id, name, x, y);
    let tile:Tile | undefined = this.grid.at(x)?.at(y);
    if(tile !== undefined){
      tile.hasVillager = true;
      tile.villagers.push(villager);
    }
    this.villagers.push(villager);
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

        for(let i = 0; i < tile.villagers.length; i++){
          let villager:Villager | undefined = tile.villagers.at(i);
          if(villager != undefined){
            console.log()
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