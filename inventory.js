class Inventory {
    constructor() {
      this.items = [];
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    useItem(item) {
      // use the item in some way
    }
  }
  const inventory = new Inventory();
inventory.addItem('health potion');
inventory.addItem('magic sword');
