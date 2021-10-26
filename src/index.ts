import * as PIXI from 'pixi.js';
import { Villager } from './components/npc/villager';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();


const main = async () => {
  init();

  let world:World = new World(14,6);
  world.addVillager(1, "Bob", 4, 4);
  world.render();
  app.ticker.FPS.toFixed(60);
  app.ticker.add(()=>world.render());
  world.addVillager(2, "Joe", 3, 3);

  
};

main();

export{
  app,
  worldContainer
}