import * as PIXI from 'pixi.js';
import { load } from './components/general/textures';
import { createVillager } from './components/npc/villager';
import { generateWorld, renderWorld, setTile } from './components/world/world';
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



  let world:MapInterface = generateWorld(14,6);//Note, height must be even number

  let villager:VillagerInterface = createVillager(1, "ree", 5, 5);
  setTile(5,5,world);


  renderWorld(world, container);

  
};

main();

export{
  app,
}