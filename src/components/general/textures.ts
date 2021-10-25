import { app } from "../../index"
import { Texture } from "pixi.js";

const load = () => {
  return new Promise((resolve:any) => {//To add additional loaded files, add another line of ".add("path)
    app.loader
    .add("hexagon", "../../../assets/hex.png")
    .add("villager","../assets/man.png")
    .load(()=>{resolve();})
  });
};

const hexagonTexture = Texture.from("../assets/hex.png");
const villagerTexture = Texture.from("../assets/man.png");

export{
  load,
  villagerTexture,
  hexagonTexture,
}