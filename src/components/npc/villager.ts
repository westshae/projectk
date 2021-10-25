import { villagerTexture } from "../general/textures";
import { Sprite } from "pixi.js";

const renderVillager = (x:number, y:number, container:PIXI.Container) =>{
  let villagerSprite = Sprite.from(villagerTexture);
  container.addChild(villagerSprite);
}

export{
  renderVillager
}