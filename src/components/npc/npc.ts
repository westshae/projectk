import { Sprite } from "pixi.js";
import { game } from "../..";
import { missingTexture, villagerTexture } from "../util/textures";

let recentID = 0;

interface npcType {
  health:number;
  attack:number;
  defense:number;
  type:number;
  sprite:Sprite;
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

  render(x:number, y:number){
    //Calculates height/width of sprite
    this.sprite.width = (Math.sqrt(3) * 50) * 0.8;
    this.sprite.height = (2 * 50) * 0.8;
    
    this.sprite.x = x + (this.sprite.width * 0.15);
    this.sprite.y = y;

    //Make tile interactable
    this.sprite.interactive = true;
    this.sprite.on("pointerdown", this.select);

    game.world.container.addChild(this.sprite);//Adds to world container
  }

  select(){
    game.world.current = this;//Sets currently selected villager to clicked villager
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
  npcType
}