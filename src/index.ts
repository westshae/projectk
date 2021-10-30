import * as PIXI from 'pixi.js';
import { NPC } from './components/npc/npc';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();
const world:World = new World(64);




const main = async () => {
  init();//Initiates screen/containers

  //Adds villagers, with id 1/2, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  world.addVillager(1, "Bob", 4, 4);
  world.addVillager(2, "Joe", 3, 3);
  world.render();
};

main();

export{
  app,
  worldContainer,
  world,
}