class Monster {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.theImage = theImage;
    this.dx = 5;
    this.dy = 5;


  }

      
      
  
    
  display() {
    
    imageMode(CENTER);
    image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    imageMode(CORNER);

  }

  
 
}









  






    