import { Sprite } from "pixi.js";
import { world, worldContainer } from "../..";
import { Villager } from "../npc/villager";
import { dirtTileTexture, grassTileTexture, mountainTexture, sandTileTexture, treeTexture, waterTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  hasVillager:boolean;
  sprite:Sprite;
  villager?:Villager;
  isHighlighted:boolean;

  constructor(x:number, y:number, noise:number){
    this.x = x;
    this.y = y;
    this.hasVillager = false;
    this.isHighlighted = false;
    this.sprite = this.handleSprite(noise);

    //Makes clicking with mouse send to handler
    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleSprite(noise:number){//Returns sprite based on noise value
    if(noise < 0){
      return Sprite.from(sandTileTexture);
    }
    else{
      return Sprite.from(dirtTileTexture);
    }
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