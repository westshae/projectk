import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";
import { Container, Sprite } from "pixi.js";

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
  world.grid.map((value, _)=>{
    value.map((value2, _)=>{
      console.log(value2);
      // let hexagon:PIXI.Sprite = new PIXI.Sprite(
      //   app.loader.resources['assets/hexagonal.png'].texture
      // );;
      let hexagon:PIXI.Sprite = new Sprite(texture);
      hexagon.width = size;
      hexagon.height = size;
      hexagon.x = value2.x * size;
      hexagon.y = value2.y * size;
      container.addChild(hexagon);
    })
  })
}

export {
  generateWorld,
  renderWorld
}