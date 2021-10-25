import * as PIXI from 'pixi.js';
import { Villager } from './components/npc/villager';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();


const main = async () => {
  init();
  
  let world:World = new World(14,6);
  world.render();
  let villager:Villager = new Villager(1, "Chur", 5, 5);
  villager.render();
  
};

main();

export{
  app,
  worldContainer
}