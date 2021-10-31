import { Sprite } from "pixi.js";
import { world, worldContainer } from "../..";
import { missingTexture, houseTexture } from "../util/textures";

let recentID = 0;

interface buildingType {
    health:number;
    defense:number;
    type:number;
    buildTurns:number;
    sprite:Sprite;
  }

class Building {
id:number;
type:number;
  health:number;
  defense:number;
  buildTurns:number;
  sprite:Sprite;
  x:number;
  y:number;

  constructor(x:number, y:number, type:buildingType){
    this.health = type.health;
    this.defense = type.defense;
    this.type = type.type;
    this.buildTurns = type.buildTurns;
    this.x = x;
    this.y = y;

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

    worldContainer.addChild(this.sprite);//Adds to world container
  }

  select(){
    //Cannot select a building (yet)
  }

  handleSprite(){
    switch(this.type){
      case 0:
        return Sprite.from(houseTexture);
      default:
        return Sprite.from(missingTexture);
    }
  }

}

export{
  Building,
  buildingType
}