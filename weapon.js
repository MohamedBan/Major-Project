class Weapon {
    constructor(name, damage) {
      this.name = name;
      this.damage = damage;
    }
  }
  const pistol = new Weapon('pistol', 10);
  const shotgun = new Weapon('shotgun', 20);
  function switchWeapon(newWeapon) {
    currentWeapon = newWeapon;
  }

  

    