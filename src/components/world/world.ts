import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";
import { Sprite } from "pixi.js";

const generateGrid = (x:number, y:number) =>{//Creates a grid of tiles, x wide, y high
  let grid:Array<Array<TileInterface>> = [];

  for(let width:number = 0; width < x; width++){//For each required tile
    grid[width] = [];
    for(let height:number = 0; height < y; height++){
      grid[width][height] = createTile(width, height);//Set spot in grid to new tile
    }
  }

  return grid;
}

const createTile = (x:number, y:number) =>{//Creates a tile at the specific coordinate
  let tile:TileInterface = {
    x:x,
    y:y,
  }
  return tile;
}

const generateWorld = (x:number, y:number) =>{//Creates a world including grid + data
  let world:MapInterface = {
    grid:generateGrid(x,y),
    width:x,
    height:y,
  }
  return world;
}

const renderWorld = (world:MapInterface, texture:PIXI.Texture, container:PIXI.Container) =>{
  let size = 50;//Size for calculating height/width
  let width = Math.sqrt(3) * size;//Width between center of hexagon
  let height = 2 * size;//Height between center of hexagon

  let useOffset = false;//Changes between true and false, every time a now row is made.
  let heightOffset = 0;//Total change to affect the drawn height

  world.grid.map((value, xindex)=>{//For each tile
    value.map((value2, yindex)=>{
      let hexagon:PIXI.Sprite = new Sprite(texture);//Make sprite from texture
      
      //Sets hexagon width/height
      hexagon.width = width;
      hexagon.height = height;


      if(useOffset){//If useOffset

        hexagon.x = (value2.x * width) + (width/2);
        hexagon.y = (value2.y * height) - heightOffset;

        heightOffset += (height/2);//increase offset by half height
        if(yindex == world.height-1){//if Y index == world height, move offset by 2* height up
          heightOffset -= (height/4) * world.height
        }
      }else{//If !useOffset
        hexagon.x = (value2.x * width);
        hexagon.y = (value2.y * height) + (height/4) - heightOffset;  
      }

      if(xindex == 4 && yindex ==4){
        hexagon.x = 0;
        hexagon.y = 0;
      }

      container.addChild(hexagon);//Adds to state
      useOffset = !useOffset;//Switches useOffset
    })
  })
}

export {
  generateWorld,
  renderWorld
}