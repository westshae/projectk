import * as PIXI from 'pixi.js';
import { generateWorld, renderWorld } from './components/world/world';
import { MapInterface } from './interfaces/map';

const load = (app: PIXI.Application) => {
  return new Promise((resolve:any) => {//To add additional loaded files, add another line of ".add("path)
    app.loader
    .add("assets/hex.png")
    .load(()=>{resolve();})
  });
};

const windowSize = (app: PIXI.Application) =>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', (e:UIEvent) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
}



const main = async () => {
  let app = new PIXI.Application();  // Application itself

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
  await load(app);
  let hexagon = PIXI.Texture.from("assets/hex.png");

  document.body.appendChild(app.view);

  let world:MapInterface = generateWorld(20,20);
  renderWorld(world, hexagon, container);
};

main();