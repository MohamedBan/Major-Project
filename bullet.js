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
    this.x += this.dx;
    this.rotation();
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
    image(this.theImage, this.x, this.y);
    this.rotation();
  }
  
  delete() {
    this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);

  }
  rotation() {
    let angle = atan2(mouseY - height / 2, mouseX - width / 2);
    push();
    translate(player1.x, player1.y);
    rotate(angle);
    image(this.theImage, this.x, this.y);
    pop();
  }

  isOffScreen() {
    // check if the bullet is still on the screen

    return this.x >= width || this. x < 0 || this.y >= height || this. y < 0;
  }
}
  