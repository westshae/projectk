import { app, world, worldContainer } from "../..";
import { Viewport } from "pixi-viewport";

const init = async() =>{
  windowSize();
  windowHTML();
  document.body.appendChild(app.view);

  //Adds viewport to stage, then world to viewport
  app.stage.addChild(viewport);
  viewport.addChild(worldContainer);

  //Settings for camera
  viewport
  .drag()//Drag mouse to move camera
  .wheel()//Changes scroll wheel to zoom
}

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
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