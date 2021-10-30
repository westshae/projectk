import { Viewport } from "pixi-viewport";
import { app, worldContainer } from "../..";

const displayInit = () =>{
  windowSize();//Adds events to resize application on resize
  windowHTML();//Makes display stick to top-left corner
  document.body.appendChild(app.view);//Adds view of app to website
  app.renderer.backgroundColor = 0x572529;  //Changes background colour


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
  displayInit,
}