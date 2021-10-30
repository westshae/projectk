import { HUD } from "../hud/hud";
import { displayInit } from "./display";

const init = async() =>{
  displayInit();//Initiates display

  //Init HUD
  const hud = new HUD();
  hud.init();

  
}



export{
  init,
}