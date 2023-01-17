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
    let distance = dist(player1.x, player1.y, mouseX, mouseY);
    this.x = cos(angle) * distance;
    this.y = sin(angle) * distance;
   
    
    
    


    
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
    let vec = createVector(this.x, this.y);
    this.dx = lerp(this.dx, vec.x, 0.1);
    this.dy = lerp(this.dy, vec.y, 0.1);
    image(this.theImage, this.dx, this.dy);
    

    
  }
  
  delete() {
    this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);

  }

  
    
  
 

  isOffScreen() {
    // check if the bullet is still on the screen

    return this.x >= width || this. x < 0 || this.y >= height || this. y < 0;
  }
}
  