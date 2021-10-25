import { villagerTexture } from "../general/textures";
import { Sprite } from "pixi.js";

const createVillager = (id:number, name:string, x:number, y:number) =>{
  let villager = {
    id:id,
    name:name,
    x:x,
    y:y,
  }

  return villager;
}

const renderVillager = (x:number, y:number, container:PIXI.Container) =>{
  let villagerSprite = Sprite.from(villagerTexture);
  villagerSprite.width = Math.sqrt(3) * 50;
  villagerSprite.height = 2 * 50;
  
  villagerSprite.x = x;
  villagerSprite.y = y;

  container.addChild(villagerSprite);
}

export{
  renderVillager,
  createVillager
}