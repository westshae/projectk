import { TileInterface } from "./tile";

interface MapInterface {
  grid:Array<Array<TileInterface>>,
  width:number,
  height:number,
}


export{
  MapInterface,
}