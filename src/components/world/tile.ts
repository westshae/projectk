import { Sprite } from "pixi.js";
import { app, world, worldContainer } from "../..";
import { Villager } from "../npc/villager";
import { hexagonTexture } from "../util/textures";


class Tile{
  x:number;
  y:number;
  hasVillager:boolean;
  sprite:Sprite;
  villagers:Array<Villager>;
  isHighlighted:boolean;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
    console.log("REE: " + x + ":" + y);
    this.hasVillager = false;
    this.isHighlighted = false;
    this.villagers = new Array<Villager>();
    this.sprite = Sprite.from(hexagonTexture);

    this.sprite.interactive = true;
    this.sprite.on("mousedown", this.handleClick);


    worldContainer.addChild(this.sprite);
  }

  handleClick(event:any){
    if(world.current != undefined){
      if(this.villagers == undefined){
        this.villagers = [];
      }
      let villager:Villager = world.current;
      villager.x = this.x;
      villager.y = this.y;
      this.hasVillager = true;
      this.villagers.push(villager);
      world.current = undefined;

      villager.render(this.x,this.y);



    }
  }
}

export{
  Tile,
}