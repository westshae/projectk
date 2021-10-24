import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";

const generateGrid = (x:number, y:number) =>{
  let grid:Array<Array<TileInterface>> = [];
  for(let width:number = 0; width < x; width++){
    grid[width] = [];
    for(let height:number = 0; height < y; height++){
      grid[width][height] = createTile(width, height);
    }
  }

  return grid;
}

const createTile = (x:number, y:number) =>{
  let tile:TileInterface = {
    x:x,
    y:y
  }
  return tile;
}

const generateWorld = (x:number, y:number) =>{
  let world:MapInterface = {
    map:generateGrid(x,y),
    width:x,
    height:y,
  }
  return world;
}

export {
  generateWorld,
}