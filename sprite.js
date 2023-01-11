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
    let xPos = Math.floor(this.x/cellWidth);
    let yPos = Math.floor(this.y/cellHeight);



    //d
    if (keyIsDown(68) && grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] !==1) {
      this.x += this.dx;
      if(grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] ===2){
        image(interactE, this.x*cellWidth+10, this.y*cellHeight-20, cellWidth,cellHeight);
      }
      
      
    }
      
    //a
    if (keyIsDown(65) && grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] !== 1) {
      this.x -= this.dx;
      if(grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] ===2){
        image(interactE, this.x*cellWidth+10, this.y*cellHeight-20, cellWidth,cellHeight);
        console.log("hooray");
      }
    }
      
      
    //w
    if (keyIsDown(87) && grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] !== 1) {
      this.y -= this.dy;
      if(grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] ===2){
        image(interactE, this.x*cellWidth+10, this.y*cellHeight-20, cellWidth,cellHeight);
      }
      
        
    }
      
      
    //s
    if (keyIsDown(83) && grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] !== 1 ) {
      this.y += this.dy;
      if(grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] ===2){
        image(interactE, this.x*cellWidth+10, this.y*cellHeight-20, cellWidth,cellHeight);
      }
        
    }


      
      
  }
    
  display() {
    
    imageMode(CENTER);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    imageMode(CORNER);

  }

  
  calculatePos(value, cellsize) {
    return Math.floor(value/cellsize);
  }

  hit(){
    hit = collideRectRect(this.x , this.y, cellWidth, cellHeight, mouseX, mouseY, cheeseSize, cheeseSize);
  }
}
  