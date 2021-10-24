import * as PIXI from 'pixi.js';

const load = (app: PIXI.Application) => {
  return new Promise((resolve:any) => {//To add additional loaded files, add another line of ".add("path)
    app.loader
    .add('assets/hexagonal.png')
    .add("assets/hello-world.png")
    .load(()=>{resolve();})
  });
};

const windowSize = (app: PIXI.Application) =>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', (e:UIEvent) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // sprite.x = window.innerWidth / 2 - sprite.width / 2;
    // sprite.y = window.innerHeight / 2 - sprite.height / 2;
  });
}

const main = async () => {
  // Application itself
  let app = new PIXI.Application();

  // Displays application top left of window exactly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // Actively changes application size to window size
  windowSize(app);

  // Load assets
  await load(app);
  let hexagonal = new PIXI.Sprite(
    app.loader.resources['assets/hexagonal.png'].texture
  );
  hexagonal.width = 100;
  hexagonal.height = 100;
  app.stage.addChild(hexagonal);  

  document.body.appendChild(app.view);
};

main();
