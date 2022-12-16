/* eslint-disable no-undef */
class Sprite {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.theImage = theImage;
    this.dx = 5;
    this.dy = 5;
    this.bulletArray = [];
  }
    
  update() {
      
  
    for (const bullet of this.bulletArray){
      bullet.update();
      bullet.display();
        
        
    }
    this.inputHandler();
      
      
      
      
      
  }
  inputHandler(){
    //d
    if (keyIsDown(68) && this.x < width- cellWidth && this.checkPosition(this.dx, 0)) {
      this.x+=this.dx;
      
      
    }
      
    //a
    if (keyIsDown(65) && this.x >= 0 && this.checkPosition(-this.dx, 0)) {
      this.x-=this.dx;
        
    }
      
      
    //w
    if (keyIsDown(87) && this.y >= 0 && this.checkPosition(0, -this.dy)) {
      this.y-=this.dy;
      
        
    }
      
      
    //s
    if (keyIsDown(83) && this.y < height-cellHeight && this.checkPosition(0, this.dy)) {
      this.y+=this.dy;
        
        
    }
      
      
  }
    
  display() {
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
  }

  checkPosition(directionX, directionY){
    let xPos;
    let yPos;
    if (directionX>0){
      xPos = Math.floor((this.x+directionX+cellWidth)/cellWidth);
      yPos = Math.floor(this.y/cellHeight);
    }
    else if (directionY>0){
      xPos = Math.floor(this.x/cellWidth);
      yPos = Math.floor((this.y-directionY+cellHeight)/cellHeight);
    }
    else{
      xPos = Math.floor((this.x+directionX)/cellWidth);
      yPos = Math.floor((this.y+directionY)/cellHeight);
    }
    
        
    
    return grid[yPos][xPos] === 0 || grid[yPos][xPos] !== 1;
        
  }

  hit(){
    hit = collideRectRect(this.x , this.y, cellWidth, cellHeight, mouseX, mouseY, cheeseSize, cheeseSize);
  }
}
  