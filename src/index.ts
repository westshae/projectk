import * as PIXI from 'pixi.js';
import { NPC } from './components/npc/npc';
import { villager } from './components/npc/npcTypes';
import { townCenter } from "./components/world/buildingTypes";
import { init } from './components/util/init';
import { World } from './components/world/world';

const app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();
const world:World = new World(64);




const main = async () => {
  init();//Initiates screen/containers

  //Adds villagers, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  world.addNPC(3, 3, villager, "Bob");
  world.addNPC(4, 4, villager, "Joe");
  world.addBuilding(5, 5, townCenter);
  world.render();
};

main();

export{
  app,
  worldContainer,
  world,
}