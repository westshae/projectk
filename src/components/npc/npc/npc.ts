import { Sprite } from "pixi.js";
import { game } from "../../..";
import { Items } from "../../items/items";
import { missingTexture, villagerTexture } from "../../util/textures";

let recentID = 0;

interface npcInterface {
  health:number;
  attack:number;
  defense:number;
  type:number;
  sprite:Sprite;
  movement:number;
  items?:Array<Items>;
}
class NPC {
  id:number;
  name:string;
  type:npcInterface;
  typeID:number;
  health:number;
  attack:number;
  defense:number;
  sprite:Sprite;
  movement:number;
  x:number;
  y:number;

  constructor(x:number, y:number, type:npcInterface, name:string){
    this.attack = type.attack;
    this.health = type.health;
    this.defense = type.defense;
    this.typeID = type.type;
    this.type = type;
    this.movement = type.movement;
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
    this.sprite.on("pointerdown", () => game.world.setCurrent(this));

    game.world.container.addChild(this.sprite);//Adds to world container
  }
  handleNextTurn(){
    this.movement = this.type.movement;
  }

  handleSprite(){
    switch(this.typeID){
      case 0:
        return Sprite.from(villagerTexture);
      default:
        return Sprite.from(missingTexture);
    }
  }

}

export{
  NPC,
  npcInterface
}