import { Application, Container } from 'pixi.js';
import { villager } from './components/npc/npcTypes';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new Application();  // Application itself
const worldContainer = new Container();
const world:World = new World(64);

class Resources {
  lumber:number;
  stone:number;
  metal:number;
  experience:number;
  level:number;
  
  constructor(){
    this.lumber = 0;
    this.stone = 0;
    this.metal = 0;
    this.experience = 0;
    this.level = 0;
  }

  increaseResource(resourceID:number, amount:number){
    switch(resourceID){
      case 0:
        this.lumber += amount;
        break;
      case 1:
        this.stone += amount;
        break;
      case 2:
        this.metal += amount;
        break;
      case 3:
        this.experience += amount;
        break;
      case 4:
        this.level += amount;
        break;
    }
  }

  decreaseResource(resourceID:number, amount:number){
    switch(resourceID){
      case 0:
        this.lumber -= amount;
        break;
      case 1:
        this.stone -= amount;
        break;
      case 2:
        this.metal -= amount;
        break;
      case 3:
        this.experience -= amount;
        break;
      case 4:
        this.level -= amount;
        break;
    }
  }
}

const main = async () => {
  init();//Initiates screen/containers

  //Adds villagers, with id 1/2, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  world.addNPC(3, 3, villager, "Bob");
  world.addNPC(4, 4, villager, "Joe");
  world.render();
};

main();

export{
  app,
  worldContainer,
  world,
  Resources,
}