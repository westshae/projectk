class Resources {
  lumber:number;
  stone:number;
  metal:number;
  experience:number;
  level:number;
  
  constructor(){
    this.lumber = 0;
    this.stone = 0;
    this.metal = 0;
    this.experience = 0;
    this.level = 0;
  }

  increaseResource(resourceID:number, amount:number){
    switch(resourceID){
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
    }
  }

  decreaseResource(resourceID:number, amount:number){
    switch(resourceID){
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
  }
}

export{
  Resources,
}