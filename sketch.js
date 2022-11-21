// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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


const ROWS = 30;
const COLS = 30;
let grid;
let cellWidth;
let cellHeight;
let playerX = 0;
let playerY = 0;
let stoneImg;
let grassImg;
let survivorImg;
let knifeGif;
let reloadGif;
let bulletImg;
let muzzle;

let bulletArr = [];
let rectangle = {
  x: 100,
  y: 100,
  width: 100,
  height: 100
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = createRandom2dArray(COLS, ROWS);
  //place player in grid
  grid[playerY][playerX] = 9;
}

function preload(){
  stoneImg = loadImage("rock.png");
  grassImg = loadImage("grass.png");
  survivorImg = loadImage("survivor.png");
  knifeGif = loadImage("knife.gif");
  reloadGif = loadImage("reload.gif");
  bulletImg = loadImage("bullet.png");
  muzzle = loadImage("muzzle.png");
}

function draw() {
  background(220);
  displayGrid(grid);
  rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  for (let i = 0; i< bulletArr.length; i++){
    bulletArr[i].display();
    bulletArr[i].update();
  }

  


  
}

function keyPressed() {
  if (keyCode === " "){
    bulletArr.push(new Bullet(bulletArr, rectangle, bulletImg));
  }
  if (keyCode === "g"){
    knifeGif.play();
  }
  if (keyCode === RIGHT_ARROW) {
    if (grid[playerY][playerX+1] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerX++;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === LEFT_ARROW) {
    if (grid[playerY][playerX-1] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerX--;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === UP_ARROW) {
    if (grid[playerY-1][playerX] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerY--;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (grid[playerY+1][playerX] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerY++;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }
}

function mousePressed() {
  let xPos = Math.floor(mouseX/cellWidth);
  let yPos = Math.floor(mouseY/cellHeight);

  if (grid[yPos][xPos] === 0) {
    grid[yPos][xPos] = 1;
  }
  else if (grid[yPos][xPos] === 1) {
    grid[yPos][xPos] = 0;
  }
}

function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        
      }
      else if (grid[y][x] === 1) {
        image(stoneImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        image(survivorImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        
      }
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function createRandom2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}