import * as PIXI from 'pixi.js';
import { NPC } from './components/npc/npc';
import { Villager } from './components/npc/villager';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();
const world:World = new World(64);




const main = async () => {
  init();//Initiates screen/containers

  //Adds villagers, with id 1/2, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  world.addNPC(3, 3, Villager, "Bob");
  world.addNPC(4, 4, Villager, "Joe");
  world.render();
};

main();

export{
  app,
  worldContainer,
  world,
}