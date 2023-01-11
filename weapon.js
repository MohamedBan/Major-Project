class Weapon{
  constructor(name,damage,range){
      this.name = name;
      this.damage = damage;
      this.range = range;
  }
  attack(){
      console.log(`You attacked with ${this.name} and dealt ${this.damage} damage`);
  }
}

let sword = new Weapon("Sword",10,2);


    