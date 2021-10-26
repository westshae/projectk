import { Sprite } from "pixi.js";
import { world, worldContainer } from "../..";
import { Villager } from "../npc/villager";
import { hexagonTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  hasVillager:boolean;
  sprite:Sprite;
  villager?:Villager;
  isHighlighted:boolean;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
    console.log("REE: " + x + ":" + y);
    this.hasVillager = false;
    this.isHighlighted = false;
    this.sprite = Sprite.from(hexagonTexture);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleClick(){//Handles click event
    if(world.current != undefined){//If there is currently a selected villager
      let villager:Villager = world.current;//Gets villager from world.current

      //Changes villager x/y coords
      villager.x = this.x;
      villager.y = this.y;

      //Updates tile's villager
      this.villager = villager;
      this.hasVillager = true;

      //Resets currently selected villager
      world.current = undefined;
    }
  }
}

export{
  Tile,
}