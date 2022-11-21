
class Bullet {
  constructor(bulletArr, character, img){
    this.character = character;
    this.x = this.character.x + this.character.width;
    this.y = this.character.y + this.character.height/2;
    this.img = img;
    this.bulletArr = bulletArr;
  }
  
  display(){
    image(this.img, this.x, this.y, this.img.width*0.1, this.img.height*0.1);
  }
  
  update(){
    this.x += 5;
  
    if (this.x > windowWidth){
      this.bulletArr.splice(this.bulletArr.indexOf(this), 1);
    }
  }
  
}