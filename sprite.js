/* eslint-disable no-undef */
class Fighter {
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
    this.updateHealth(this.x, this.y, health, maxHealth);

    
    this.inputHandler();
   
      
    this.rotate();
      
      
      
  }
  inputHandler(){
    let xPos = Math.floor(this.x/cellWidth);
    let yPos = Math.floor(this.y/cellHeight);
    let state = 0;
    let angle = 0

    //d
    if (keyIsDown(68) && grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] !==1) {
      this.x += this.dx;
      if(grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] ===2){
        state = 1;
      }
      
      
    }
      
    //a
    if (keyIsDown(65) && grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] !== 1) {
      this.x -= this.dx;
      if(grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] ===2){
        state = 1;
        
      }
    }
      
      
    //w
    if (keyIsDown(87) && grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] !== 1) {
      this.y -= this.dy;
      if(grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] ===2){
        state = 1;
      }
      
        
    }
      
      
    //s
    if (keyIsDown(83) && grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] !== 1 ) {
      this.y += this.dy;
      if(grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] ===2){
        state = 1;
      }
        
    }
    if (state === 1){
      image(interactE, xPos*cellWidth+10, yPos*cellHeight-20, cellWidth,cellHeight);

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

  
  
  updateHealth(x,y, health, maxHealth){
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(x -10, y-15, 20, 1.5);
  noStroke();
  fill(255,0,0);
  rect(x -10 ,y -15,map(health, 0, maxHealth, 0, 20), 1.5);
  
}
rotate(){
  let xPos = Math.floor(this.x/cellWidth);
  let yPos = Math.floor(this.y/cellHeight);
  let state = 0;
  let angle = 0
  //d
  if (keyIsDown(68) && grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] !==1) {
    push();
    angle += (0 * Math.PI) / 180;
    translate(width / 2, height / 2);
    rotate(angle);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    pop();
    
    
  }
    
  //a
  if (keyIsDown(65) && grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] !== 1) {
    push();
    angle += (180 * Math.PI) / 180;
    translate(width / 2, height / 2);
    rotate(angle);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    pop();
  }
    
    
  //w
  if (keyIsDown(87) && grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] !== 1) {
    push();
    angle += (270 * Math.PI) / 180;
    translate(width / 2, height / 2);
    rotate(angle);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    pop();
    
      
  }
    
    
  //s
  if (keyIsDown(83) && grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] !== 1 ) {
    push();
    angle += (90 * Math.PI) / 180;
    translate(width / 2, height / 2);
    rotate(angle);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    pop();
      
  }
}

}
  