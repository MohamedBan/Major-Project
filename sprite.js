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
      
  
      for (let i=this.bulletArray.length-1; i > 0; i--){
        this.bulletArray[i].update();
        this.bulletArray[i].display();
        if (this.bulletArray[i].isOffScreen()){
          this.bulletArray.splice(i, 1);
        }
        
      }
      this.inputHandler();
      
      
      
      
      
    }
    inputHandler(){
      //d
      if (keyIsDown(68)) {
        this.x+=this.dy;
      
      
      }
      
        //a
      if (keyIsDown(65)) {
        this.x-=this.dx;
        
      }
      
      
      //w
      if (keyIsDown(87)) {
        this.y-=this.dy;
      
        
      }
      
      
      //s
      if (keyIsDown(83)) {
        this.y+=this.dy;
        
        
      }
      
      if (keyIsDown(32)) {
        let someBullet = new Bullet(this.x, this.y, 0, -5,this, bulletImg);
        this.bulletArray.push(someBullet);
        
      }
    }
    
    display() {
      image(this.theImage, this.x, this.y, cellWidth, cellHeight);
    }
  }
  