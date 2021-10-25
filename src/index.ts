import * as PIXI from 'pixi.js';
import { load } from './components/general/textures';
import { Villager } from './components/npc/villager';
import { World } from './components/world/world';
// import { generateWorld, renderWorld, setTile } from './components/world/world';
import { MapInterface } from './interfaces/map';


const windowSize = (app: PIXI.Application) =>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', (e:UIEvent) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
}


let app = new PIXI.Application();  // Application itself
const worldContainer = new PIXI.Container();


const main = async () => {

  // Displays application top left of window exactly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // Actively changes application size to window size
  windowSize(app);

  //Create container for view
  app.stage.addChild(worldContainer);

  // Load assets
  await load();
  // let hexagon = PIXI.Texture.from("assets/hex.png");

  document.body.appendChild(app.view);



  // let world:MapInterface = generateWorld(14,6);//Note, height must be even number

  // let villager:VillagerInterface = createVillager(1, "ree", 5, 5);
  let world:World = new World(14,6);
  world.render();
  let villager:Villager = new Villager(1, "Chur", 5, 5);
  villager.render();
  // setTile(5,5,world);


  // renderWorld(world);

  
};

main();

export{
  app,
  worldContainer
}