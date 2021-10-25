import * as PIXI from 'pixi.js';
import { load } from './components/general/textures';
import { generateWorld, renderWorld } from './components/world/world';
import { MapInterface } from './interfaces/map';
import { VillagerInterface } from './interfaces/villager';


const windowSize = (app: PIXI.Application) =>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', (e:UIEvent) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
}


let app = new PIXI.Application();  // Application itself

const main = async () => {

  // Displays application top left of window exactly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // Actively changes application size to window size
  windowSize(app);

  //Create container for view
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Load assets
  await load();
  // let hexagon = PIXI.Texture.from("assets/hex.png");

  document.body.appendChild(app.view);

  // let villagerTexture = PIXI.Texture.from("assets/man.png");
  // let villager:VillagerInterface = null;


  let world:MapInterface = generateWorld(10,10);
  renderWorld(world, container);

  
};

main();

export{
  app,
}