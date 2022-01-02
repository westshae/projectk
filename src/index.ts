import { sword } from './components/defaults/items';
import { chicken, villager } from './components/defaults/npc';
import { Game } from './components/util/game';
import { townCenter } from './components/defaults/builds';
import { chest, tree } from './components/defaults/node';

const game = new Game(64);

const main = async () => {
  game.init();
  game.world.generateRandom();

  //Adds villagers, names bob/joe, at coords 4:4 and 3:3 then rendersthe world
  game.world.addNPC(10, 10, villager, 'Bob');
  game.world.addNPC(6,6,chicken, "CHICKEN");

  game.world.render();
};

main();

export { game };
