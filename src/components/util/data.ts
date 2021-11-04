import { game } from '../..';

class Data {
  lumber: number;
  stone: number;
  metal: number;
  experience: number;
  level: number;
  turn: number;

  constructor() {
    this.lumber = 0;
    this.stone = 0;
    this.metal = 0;
    this.experience = 0;
    this.level = 0;
    this.turn = 0;
  }

  increaseResource(resourceID: number, amount: number) {
    switch (resourceID) {
      case 0:
        this.lumber += amount;
        break;
      case 1:
        this.stone += amount;
        break;
      case 2:
        this.metal += amount;
        break;
      case 3:
        this.experience += amount;
        break;
      case 4:
        this.level += amount;
        break;
      case 5:
        this.turn += amount;
        break;
    }
    game.hud.drawInformation();
  }

  decreaseResource(resourceID: number, amount: number) {
    switch (resourceID) {
      case 0:
        this.lumber -= amount;
        break;
      case 1:
        this.stone -= amount;
        break;
      case 2:
        this.metal -= amount;
        break;
      case 3:
        this.experience -= amount;
        break;
      case 4:
        this.level -= amount;
        break;
    }
    game.hud.drawInformation();
  }
}

export { Data };
