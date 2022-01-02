import { chicken, villager } from './components/defaults/npc';
import { Game } from './components/util/game';

const game = new Game(64);

const main = async () => {
  game.init();
  game.world.generateRandom();
  game.world.spawnPlayer();
  game.world.render();
};

main();

export { game };
