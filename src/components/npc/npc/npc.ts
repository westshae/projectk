import { Sprite } from "pixi.js";
import { game } from "../../..";
import { itemInterface, Items } from "../../items/items";
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
  defaultValues:npcInterface;
  typeID:number;
  health:number;
  attack:number;
  defense:number;
  sprite:Sprite;
  movement:number;
  x:number;
  y:number;

  itemList:Array<itemInterface>;

  constructor(x:number, y:number, defaultValues:npcInterface, name:string){
    this.attack = defaultValues.attack;
    this.health = defaultValues.health;
    this.defense = defaultValues.defense;
    this.typeID = defaultValues.type;
    this.defaultValues = defaultValues;
    this.movement = defaultValues.movement;
    this.x = x;
    this.y = y;
    this.name = name;
    this.itemList = [];


    //Increases ID number by 1, then sets
    recentID++;
    this.id = recentID;

    this.sprite = this.handleSprite();
  }

  addItem(item:itemInterface){
    if(this.itemList !== undefined){
      this.itemList.push(item);
    }
  }

  removeItem(item:itemInterface){
    if(this.itemList !== undefined){
      if(this.itemList.includes(item)){
        this.itemList.forEach((value, index)=>{
          if(value == item){
            this.itemList.splice(index, 1);
          }
        })
      }
    }
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
    this.movement = this.defaultValues.movement;
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