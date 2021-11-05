import { sword } from './components/items/itemTypes';
import { villager } from './defaults/npc';
import { Game } from './components/util/game';
import { townCenter } from './defaults/builds';
import { tree } from './defaults/node';

const game = new Game(64);

const main = async () => {
  game.init();

  //Adds villagers, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  game.world.addNPC(3, 3, villager, 'Bob');
  game.world.addNPC(4, 4, villager, 'Joe');
  game.world.addBuilding(5, 5, townCenter);
  game.world.npcMap.get(1)?.addItem(sword);
  game.world.npcMap.get(1)?.removeItem(sword);
  game.world.addNode(6, 6, tree, 10);
  game.world.render();
};

main();

export { game };
