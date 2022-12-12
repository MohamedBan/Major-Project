class Bullet {
  constructor(x, y, dx, dy, fighter, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.theImage = theImage;
    this.fighter = fighter;
    
  }
  
  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.x += this.dx;
    if (this.isOffScreen()){
      this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);
  
    }
      
  }
  
  display() {
    // show the bullet
    image(this.theImage, this.x, this.y);
  }
  
  isOffScreen() {
    // check if the bullet is still on the screen
    return this.x >= windowWidth;
  }
}
  