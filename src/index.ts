import { villager } from './components/npc/npcTypes';
import { Game } from './components/util/game';
import { townCenter } from './components/world/buildingTypes';
import { tree } from './components/world/nodeTypes';

const game = new Game(64);

const main = async () => {
  game.init();

  //Adds villagers, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  game.world.addNPC(3, 3, villager, "Bob");
  game.world.addNPC(4, 4, villager, "Joe");
  game.world.addBuilding(5, 5, townCenter);
  game.world.addNode(6, 6, tree);
  game.world.render();
};

main();

export{
  game,
}