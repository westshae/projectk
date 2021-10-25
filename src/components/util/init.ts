import { app, worldContainer } from "../..";


const init = async() =>{
  windowSize();
  windowHTML();
  await load();
  app.stage.addChild(worldContainer);
  document.body.appendChild(app.view);


}

const load = () => {
  return new Promise((resolve:any) => {//To add additional loaded files, add another line of ".add("path)
    app.loader
    .add("hexagon", "../../../assets/hex.png")
    .add("villager","../assets/man.png")
    .load(()=>{resolve();})
  });
};

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