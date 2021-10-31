import { villager } from './components/npc/npcTypes';
import { Game } from './components/util/game';

const game = new Game(64);

const main = async () => {
  game.init();

  //Adds villagers, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  world.addNPC(3, 3, villager, "Bob");
  world.addNPC(4, 4, villager, "Joe");
  world.addBuilding(5, 5, townCenter);
  world.render();
};

main();

export{
  game,
}