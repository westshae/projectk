import { Sprite } from "pixi.js";
import { game } from "../../..";
import { buffInterface, itemInterface, Items } from "../../items/items";
import { missingTexture, villagerTexture } from "../../util/textures";
import { Tile } from "../../world/tile";

let recentID = 0;

interface npcInterface {
  health:number;
  attack:number;
  defense:number;
  id:number;
  sprite:Sprite;
  movement:number;
  items?:Array<Items>;
}
class NPC {
  id:number;//ID for NPC, same as npcMap key
  name:string;//Name of NPC
  defaultValuesID:number;//ID of NPC default values
  defaultValues:npcInterface;//Values that NPC is initated from
  sprite:Sprite;//Sprite variable

  //NPC Stats
  health:number;
  attack:number;
  defense:number;
  movement:number;

  //Map coordinate 
  x:number;
  y:number;

  itemList:Array<itemInterface>;

  constructor(x:number, y:number, defaultValues:npcInterface, name:string){
    //Sets NPC stats
    this.attack = defaultValues.attack;
    this.health = defaultValues.health;
    this.defense = defaultValues.defense;
    this.movement = defaultValues.movement;

    //Default value sets
    this.defaultValuesID = defaultValues.id;
    this.defaultValues = defaultValues;

    //Map coord sets
    this.x = x;
    this.y = y;

    this.name = name;//Sets NPC name
    this.itemList = [];//Creates item list


    //Increases ID number by 1, then sets
    recentID++;
    this.id = recentID;

    this.sprite = this.handleSprite();//Sets sprite based on defaultValueID
  }

  doBuff(buff:buffInterface, how:boolean){//how == true, add buff to stat, vice versa
    switch (buff.statID){
      case 0:
        this.health += buff.amount * (how ? 1 : -1);//if how is true, * by 1, else * -21
    }
  }

  addItem(item:itemInterface){//Adds item to NPC
    if(this.itemList !== undefined){//If item list exists
      if(!this.itemList.includes(item)){//If item isn't in list, continue
        this.itemList.push(item);//Add item to list
        item.buffList.forEach((value, index)=>{//For each buff in item, do buff
          this.doBuff(value, true);
        })
      }
    }
  }

  removeItem(item:itemInterface){//Removes item from NPC
    if(this.itemList !== undefined){//If itemlist exists
      if(this.itemList.includes(item)){//If itemList contains item
        this.itemList.forEach((value, index)=>{//For each item
          if(value == item){//If currentItem == item, remove from itemList, undo each buff
            this.itemList.splice(index, 1);
            item.buffList.forEach((value, index)=>{
              this.doBuff(value, false);
            })
          }
        })
      }
    }
  }

  render(x:number, y:number){//Renders NPC at x:y coordinate, only run once
    //Calculates height/width of sprite
    this.sprite.width = (Math.sqrt(3) * 50) * 0.8;
    this.sprite.height = (2 * 50) * 0.8;
    
    this.sprite.x = x + (this.sprite.width * 0.15);
    this.sprite.y = y;

    game.world.container.addChild(this.sprite);//Adds to world container
  }

  handleNextTurn(){//does all requirements for nextturn
    this.movement = this.defaultValues.movement;
  }

  handleSprite(){//Returns sprite from ID
    switch(this.defaultValuesID){
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