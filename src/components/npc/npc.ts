import { Sprite } from "pixi.js";
import { missingTexture, villagerTexture } from "../util/textures";

let recentID = 0;

interface npcType {
  health:number;
  attack:number;
  defense:number;
  type:number;
}
class NPC {
  id:number;
  name:string;
  type:number;
  health:number;
  attack:number;
  defense:number;
  sprite:Sprite;
  x:number;
  y:number;

  constructor(x:number, y:number, type:npcType, name:string){
    this.attack = type.attack;
    this.health = type.health;
    this.defense = type.defense;
    this.type = type.type;
    this.x = x;
    this.y = y;
    this.name = name;

    //Increases ID number by 1, then sets
    recentID++;
    this.id = recentID;

    this.sprite = this.handleSprite();
  }

  handleSprite(){
    switch(this.type){
      case 0:
        return Sprite.from(villagerTexture);
      default:
        return Sprite.from(missingTexture);
    }
  }

}

export{
  NPC,
}