import { app, worldContainer } from "../..";
import { Viewport } from "pixi-viewport";
import { HUD } from "../hud/hud";
import { Container, Graphics } from "pixi.js";

const init = async() =>{
  windowSize();
  windowHTML();
  document.body.appendChild(app.view);

  app.renderer.backgroundColor = 0x572529;

  //Adds viewport to stage, then world to viewport
  app.stage.addChild(viewport);
  viewport.addChild(worldContainer);

  //Init HUD
  const hud = new Container();
  initHUD(hud);

  //Settings for camera
  viewport
  .drag()//Drag mouse to move camera
  .wheel()//Changes scroll wheel to zoom
}

const initHUD = (hud:Container) =>{
  app.stage.addChild(hud);

    let topHud = new Graphics();
    topHud.beginFill(0x434343);
    topHud.drawRect(0,0,window.innerWidth, 50);

    hud.addChild(topHud);
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