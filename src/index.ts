import * as PIXI from 'pixi.js';
import { Villager } from './components/npc/villager';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();
const world:World = new World(14,6);



const main = async () => {
  init();

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