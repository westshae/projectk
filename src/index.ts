import { Application, Container } from 'pixi.js';
import { Resources } from './components/data/resources';
import { villager } from './components/npc/npcTypes';
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new Application();  // Application itself
const worldContainer = new Container();
const world:World = new World(64);
const resources:Resources = new Resources();



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
}