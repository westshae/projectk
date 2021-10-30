import { villagerTexture } from "../util/textures";
import { Sprite } from "pixi.js";
import { world, worldContainer } from "../..";

class Villager {
  id:number;
  name:string;
  x:number;
  y:number;
  sprite:Sprite;

  constructor(id:number, name:string, x:number, y:number){
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.sprite = Sprite.from(villagerTexture);
  }

  // render(x:number, y:number){
  //   //Calculates height/width of sprite
  //   this.sprite.width = (Math.sqrt(3) * 50) * 0.8;
  //   this.sprite.height = (2 * 50) * 0.8;
    
  //   this.sprite.x = x + (this.sprite.width * 0.15);
  //   this.sprite.y = y;

  //   //Make tile interactable
  //   this.sprite.interactive = true;
  //   this.sprite.on("pointerdown", this.handleClick);

  //   worldContainer.addChild(this.sprite);//Adds to world container
  // }

  // handleClick(){
  //   world.current = this;//Sets currently selected villager to clicked villager
  // }
}

export{
  Villager,
}