// Project Title
class character {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.theImage = theImage;
    this.dx = 5;
    this.dy = 5;
  }

  update() {
    

    for (let i=bulletArray.length-1; i > 0; i--){
      bulletArray[i].update();
      bulletArray[i].display();
      if (bulletArray[i].isOffScreen()){
        bulletArray.splice(i, 1);
      }
    }
    

    
  }

  display() {
    image(this.theImage, this.x*cellWidth, this.y*cellHeight, cellWidth, cellHeight);
  }
}
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const ROWS = 30;
const COLS = 30;
let grid;
let cellWidth;
let cellHeight;
let playerX = 0;
let playerY = 0;
let rectX= 0;
let rectY = 0;
let stoneImg;
let grassImg;
let survivorImg;
let knifeGif;
let reloadGif;
let bulletImg;
let muzzle;
let player1;
let survivMap1;

let bulletArray = [];




function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  //place player in grid
  grid[playerY][playerX] = 9;
  player1 = new character(playerY, playerX, survivorImg);
  grid = survivMap1;
        
  

}

function preload(){
  stoneImg = loadImage("rock.png");
  grassImg = loadImage("grass.png");
  survivorImg = loadImage("survivor.png");
  knifeGif = loadImage("knife.gif");
  reloadGif = loadImage("reload.gif");
  bulletImg = loadImage("bullet.png");
  muzzle = loadImage("muzzle.png");
  survivMap1 = loadJSON("survivMap.json");

}

function draw() {
  background(220);
  displayGrid(grid);
  
  
 


  
}


class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.theImage = theImage;

  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.x += this.dx;
    // if (isOffScreen){

    // }
    
  }

  display() {
    // show the bullet
    image(this.theImage, this.x, this.y);
  }

  isOffScreen() {
    // check if the bullet is still on the screen
    return this.x >= windowWidth;
  }
}






function keyPressed() {
  if (key === " ") {
    let someBullet = new Bullet(player1.x, player1.y, 0, -5, bulletImg);
    bulletArray.push(someBullet);
    
  }

  if (keyCode === "g"){
    knifeGif.play();
  }
  if (keyIsDown(68)) {
    if (grid[player1.y][player1.x+1] === 0) {
      grid[player1.y][player1.X] = 0;
      
      
      player1.x++;
      grid[player1.y][player1.x] = 9;
      grid[player1.y][player1.x-1] = 0;
    }

  
  }

  if (keyIsDown(65)) {
    if (grid[player1.y][player1.x-1] === 0) {
      grid[player1.y][player1.x] = 0;
      
      
      player1.x--;
      grid[player1.y][player1.x] = 9;
    }
    
  }



  if (keyIsDown(87)) {
    if (grid[player1.y-1][player1.x] === 0) {
      grid[player1.y][player1.x] = 0;
      
      
      player1.y--;
      grid[player1.y][player1.x] = 9;
      grid[player1.y+1][player1.x] = 0;
    }

    
  }

  if (keyIsDown(83)) {
    if (grid[player1.y+1][player1.x] === 0) {

      grid[player1.y][player1.x] = 0;

      player1.y++;
      grid[player1.y][player1.x] = 9;
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
        player1.display();
        player1.update();
        
      
        
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

