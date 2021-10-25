import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";
import { Sprite } from "pixi.js";
import { hexagonTexture } from "../general/textures";
import { worldContainer } from "../..";
import { Tile } from "./tile";

class World {
  grid:Array<Array<Tile>>;
  width:number;
  height:number;

  constructor(width:number, height:number){
    this.width = width;
    this.height = height;
    this.grid = this.generateGrid();
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
        // console.log(tile);
        tile.sprite.width = width;
        tile.sprite.height = height;

        if(useOffset){
          tile.sprite.x = (tile.x * width) + (width/2);
          tile.sprite.y = (tile.y * height) - heightOffset;

          heightOffset += (height/2);

          if(yindex == this.height -1){
            heightOffset -= (tile.sprite.height/4) * this.height;
          }
        }
        
        else{
          tile.sprite.x = (tile.x * tile.sprite.width);
          tile.sprite.y = (tile.y * tile.sprite.height) + (tile.sprite.height/4) - heightOffset;
        }

        useOffset = !useOffset;
  
  
        // if(useOffset){//If useOffset
  
        //   tile.x = (tile.x * tile) + (width/2);
        //   tile.y = (tile.y * height) - heightOffset;
  
        //   heightOffset += (height/2);//increase offset by half height
        //   if(yindex == world.height-1){//if Y index == world height, move offset by 2* height up
        //     heightOffset -= (height/4) * world.height
        //   }
        // }else{//If !useOffset
        //   tile.x = (tile.x * width);
        //   tile.y = (tile.y * height) + (height/4) - heightOffset;  
        // }
        // useOffset = !useOffset;//Switches useOffset
      })
    })
  }
}

export {
  World,
}