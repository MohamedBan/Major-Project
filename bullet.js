/* eslint-disable no-undef */
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
    
    let angle = atan2(mouseY - this.y, mouseX - this.x);
    
    push();
    translate(this.x, this.y);
    rotate(angle);
    this.x += this.dx * cos(radians(angle));
    this.y += this.dy * sin(radians(angle));
    
    
    
    if (this.isOffScreen()){
      this.delete();
    }

    if (grid[Math.floor(this.y/cellHeight)][Math.floor(this.x/cellWidth)] === 1) {
      grid[Math.floor(this.y/cellHeight)][Math.floor(this.x/cellWidth)] = 0;
      this.delete();
    }
  }
  
  display() {
    // show the bullet
    image(this.theImage, 0, 0);
    pop();
    
  }
  
  delete() {
    this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);

  }

  
    
  
 

  isOffScreen() {
    // check if the bullet is still on the screen

    return this.x >= width || this. x < 0 || this.y >= height || this. y < 0;
  }
}
  