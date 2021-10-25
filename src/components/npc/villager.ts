import { villagerTexture } from "../util/textures";
import { Sprite } from "pixi.js";
import { worldContainer } from "../..";

// const createVillager = (id:number, name:string, x:number, y:number) =>{
//   let villager = {
    
//   }

//   return villager;
// }

// const renderVillager = (x:number, y:number, container:PIXI.Container) =>{
  // let villagerSprite = 
  // villagerSprite.width = Math.sqrt(3) * 50;
  // villagerSprite.height = 2 * 50;
  
  // villagerSprite.x = x;
  // villagerSprite.y = y;

  // container.addChild(villagerSprite);
// }

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

  render(){
    console.log(this.sprite);
  let villagerSprite = this.sprite;
  villagerSprite.width = Math.sqrt(3) * 50;
  villagerSprite.height = 2 * 50;
  
  villagerSprite.x = this.x;
  villagerSprite.y = this.y;

  worldContainer.addChild(villagerSprite);
  }
}

export{
  Villager,
}