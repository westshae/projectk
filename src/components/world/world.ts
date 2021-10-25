import { TileInterface } from "../../interfaces/tile";
import { MapInterface } from "../../interfaces/map";
import { Sprite, Texture } from "pixi.js";
import { renderVillager } from "../npc/villager";
import { hexagonTexture } from "../general/textures";
// import { hexagonTexture } from "../general/textures";

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
    hasVillager:false,
  }
  return tile;
}

const setTile = (x:number, y:number, world:MapInterface) =>{
  let tile:TileInterface = world.grid.at(x)?.at(y) ?? {hasVillager:false,x:100,y:100};
  tile.hasVillager = true;
}

const generateWorld = (x:number, y:number) =>{//Creates a world including grid + data
  let world:MapInterface = {
    grid:generateGrid(x,y),
    width:x,
    height:y,
  }
  return world;
}

const highlight = (eventData:any) =>{
  console.log(eventData);
}


const renderWorld = (world:MapInterface, container:PIXI.Container) =>{
  
  let size = 50;//Size for calculating height/width
  let width = Math.sqrt(3) * size;//Width between center of hexagon
  let height = 2 * size;//Height between center of hexagon

  let useOffset = false;//Changes between true and false, every time a now row is made.
  let heightOffset = 0;//Total change to affect the drawn height

  world.grid.map((value, xindex)=>{//For each tile
    value.map((tile, yindex)=>{
      let hexagon:Sprite = Sprite.from(hexagonTexture);
      tile.sprite = hexagon;
      hexagon.interactive = true;
      hexagon.on("mousedown", highlight);

      //Sets hexagon width/height
      hexagon.width = width;
      hexagon.height = height;


      if(useOffset){//If useOffset

        hexagon.x = (tile.x * width) + (width/2);
        hexagon.y = (tile.y * height) - heightOffset;

        heightOffset += (height/2);//increase offset by half height
        if(yindex == world.height-1){//if Y index == world height, move offset by 2* height up
          heightOffset -= (height/4) * world.height
        }
      }else{//If !useOffset
        hexagon.x = (tile.x * width);
        hexagon.y = (tile.y * height) + (height/4) - heightOffset;  
      }
      

      container.addChild(hexagon);//Adds to state
      

      if(tile.hasVillager){
        renderVillager(hexagon.x, hexagon.y, container);
      }

      useOffset = !useOffset;//Switches useOffset
    })
  })
}

export {
  generateWorld,
  renderWorld,
  setTile,
}