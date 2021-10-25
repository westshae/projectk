import { TileInterface } from "./tile";

interface MapInterface {
  grid:Array<Array<TileInterface>>,//world grid
  width:number,//how many hexagons wide
  height:number,//how many hexagons high
}


export{
  MapInterface,
}