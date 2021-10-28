import { app, worldContainer } from "../..";


const init = async() =>{
  windowSize();
  windowHTML();
  app.stage.addChild(worldContainer);
  document.body.appendChild(app.view);


}

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