class Fighter {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.theImage = theImage;
    this.dx = 1.5;
    this.dy = 1.5;
    this.bulletArray = [];
    this.angle = 0;
    this.state = "right";
    this.state1 = 0;
    this.xPos;
    this.yPos;
    this.width = cellWidth;
    this.height = cellHeight;
  }
    

  update() {
    for (const bullet of this.bulletArray){
      bullet.display();
      bullet.update();
    }

    this.updateHealth(this.x, this.y, health, maxHealth);
    this.inputHandler();
  }

  // moves my player and changes states to rotate the image or check if its near a loot chest
  inputHandler(){
    let xPos = Math.floor(this.x/cellWidth);
    let yPos = Math.floor(this.y/cellHeight);
    let state = 0;
    

    //d
    if (keyIsDown(68) && grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] !==1) {
      this.state = "right";
      this.x += this.dx;
      if(grid[yPos][this.calculatePos(this.x+this.dx, cellWidth)] ===2){
        state = 1;
      } 
    }
      
    //a
    if (keyIsDown(65) && grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] !== 1) {
      this.state = "left";
      this.x -= this.dx;
      if(grid[yPos][this.calculatePos(this.x-this.dx, cellWidth)] ===2){
        state = 1;     
      }
    }
      
      
    //w
    if (keyIsDown(87) && grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] !== 1) {
      this.state = "up";
      this.y -= this.dy;
      if(grid[this.calculatePos(this.y-this.dy, cellHeight)][xPos] ===2){
        state = 1;
      }   
    }
      
      
    //s
    if (keyIsDown(83) && grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] !== 1 ) {
      this.state = "down";
      this.y += this.dy;
      if(grid[this.calculatePos(this.y+this.dy, cellHeight)][xPos] ===2){
        state = 1;
      }    
    }

    if (state === 1){
      popX = xPos*cellWidth+10,
      popY = yPos*cellHeight-20;
    }   
  }
    
  //rotates my image depending on where its going to go
  display() {
    if (this.state === "right"){
      push();
      translate(this.x, this.y);
      rotate(0 * Math.PI / 180);
      imageMode(CENTER);
      image(this.theImage, 0, 0, cellWidth, cellHeight);
      imageMode(CORNER);
      pop();
    }

    if (this.state === "left"){
      push();
      translate(this.x, this.y);
      rotate(180* Math.PI / 180);
      imageMode(CENTER);
      image(this.theImage, 0, 0, cellWidth, cellHeight);
      imageMode(CORNER);
      pop();
    }

    if (this.state === "up"){
      push();
      translate(this.x, this.y);
      rotate(270* Math.PI / 180);
      imageMode(CENTER);
      image(this.theImage, 0, 0, cellWidth, cellHeight);
      imageMode(CORNER);
      pop();
    }

    if (this.state === "down"){
      push();
      translate(this.x, this.y);
      rotate(90* Math.PI / 180);
      imageMode(CENTER);
      image(this.theImage, 0, 0, cellWidth, cellHeight);
      imageMode(CORNER);
      pop();
    }

  }

  
  //calculates my future position to see if its going to be a wall or not
  calculatePos(value, cellsize) {
    return Math.floor(value/cellsize);
  }

  
  //adds a healthbar that follows my player
  updateHealth(x,y, health, maxHealth){
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(x -10, y-15, 20, 1.5);
    noStroke();
    fill(255,0,0);
    rect(x -10 ,y -15,map(health, 0, maxHealth, 0, 20), 1.5);
  
  }
}
  