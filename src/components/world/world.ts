import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";
import { Sprite } from "pixi.js";

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
    y:y,
  }
  return tile;
}

const generateWorld = (x:number, y:number) =>{
  let world:MapInterface = {
    grid:generateGrid(x,y),
    width:x,
    height:y,
  }
  return world;
}

const renderWorld = (world:MapInterface, texture:PIXI.Texture, container:PIXI.Container) =>{
  let size = 50;
  let width = Math.sqrt(3) * size;
  let height = 2 * size;

  let useOffset = false;
  world.grid.map((value, xindex)=>{
    value.map((value2, yindex)=>{
      console.log(value2);
      let hexagon:PIXI.Sprite = new Sprite(texture);
      hexagon.width = width;
      hexagon.height = height;
      // if(xindex %= 2){
      //   hexagon.x = (value2.x * width) - (width/2);
      // }else{
      //   hexagon.x = value2.x * width;
      // }

      // if(yindex %= 2){
      //   hexagon.y = (value2.y * height) - (height/4);
      // }else{
      //   hexagon.y = (value2.y * height);
      // }
      // if(useOffset){
      //   hexagon.x = value2.x * width;
      //   hexagon.y = value2.y * height;
      // }else{
      //   hexagon.x = (value2.x * width);
      //   hexagon.y = (value2.y * height) - (height/4);
      // }
      
      container.addChild(hexagon);
      useOffset = !useOffset;

    })

  })
}

export {
  generateWorld,
  renderWorld
}