/* eslint-disable no-undef */
class Bullet {
  constructor(x, y, fighter, theImage, state) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 5;
    this.theImage = theImage;
    this.fighter = fighter;
    this.state = state;
    
    
  }
  
  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    
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
    

    
  }
  
  delete() {
    this.fighter.bulletArray.splice(this.fighter.bulletArray.indexOf(this), 1);

  }

  
    
  
 

  isOffScreen() {
    // check if the bullet is still on the screen

    return this.x >= width || this. x < 0 || this.y >= height || this. y < 0;
  }
}
  