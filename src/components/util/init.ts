import { app, world, worldContainer } from "../..";
import { Viewport } from "pixi-viewport";
import { dirtTileTexture, waterTexture } from "./textures";
import { Sprite } from "pixi.js";

const init = async() =>{
  windowSize();
  windowHTML();
  document.body.appendChild(app.view);

  app.stage.addChild(viewport);
  viewport
  .drag()
  .pinch()
  .wheel()
  .decelerate();

  viewport.addChild(worldContainer);
}

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth:1000,
  worldHeight:1000,
}) as any;

const windowSize = () =>{
  app.renderer.resize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', (e:UIEvent) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
}

const windowHTML = () =>{
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
}

export{
  init,
}