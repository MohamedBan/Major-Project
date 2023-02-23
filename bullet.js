class Bullet {
  constructor(x, y, fighter, theImage, state) {
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 5;
    this.theImage = theImage;
    this.fighter = fighter;
    this.state = state;  
  }
  

  update() {
    //moves my bullet in different directions depending on state
    if(this.state === "up"){
      this.y -= bulletDy;
    }

    if(this.state === "right"){
      this.x += bulletDx;
    }

    if(this.state === "down"){
      this.y += bulletDy;
    }

    if(this.state === "left"){
      this.x -= bulletDx;
    }

    // delete the monster when a collision is detected
    for (let i = 0; i < monsters.length; i++) {
      if (collideRectRect(this.x, this.y, cellWidth, cellHeight, monsters[i].x, monsters[i].y, cellWidth, cellHeight)) {
        monsters.splice(i, 1);
        this.delete();
        break;
      }
    }
   
    // deletes my bullets if its off the screen
    if (this.isOffScreen()){
      this.delete();
    }

    //if it hits a wall set wall to 0 then delete bullet image
    else if (grid[Math.floor(this.y/cellHeight)][Math.floor(this.x/cellWidth)] === 1) {
      grid[Math.floor(this.y/cellHeight)][Math.floor(this.x/cellWidth)] = 0;
      this.delete();
    }
  }
  

  // show the bullet
  display() {
    image(this.theImage, this.x, this.y);
  }
  
  //deletes bullet out of array
  delete() {
    this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);

  }

  
    
  
 

  isOffScreen() {
    // check if the bullet is still on the screen

    return this.x >= width || this. x < 0 || this.y >= height || this. y < 0;
  }
}
  