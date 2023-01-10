
const ROWS = 30;
const COLS = 30;
let grid;
let cellWidth;
let cellHeight;

let stoneImg;
let grassImg;
let survivorImg;
let knifeGif;
let reloadGif;
let bulletImg;
let muzzle;
let player1;
let survivMap1;
let hit;
let chestImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  //place player in grid
  // eslint-disable-next-line no-undef
  player1 = new Sprite(0, 0, survivorImg);
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
  chestImg = loadImage("chestb.png")

}

function draw() {
  background(220);
  displayGrid(grid);
  
  player1.update();
  player1.display();
  
 


  
}


function keyPressed() {

  if (keyCode === "g"){
    knifeGif.play();
  }


}

function mousePressed() {
  
  // eslint-disable-next-line no-undef
  let someBullet = new Bullet(player1.x, player1.y, 5, 0,player1, bulletImg);
  player1.bulletArray.push(someBullet);
    
  
}

function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if close enough {
        if (grid[y][x] === 0) {
          image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
          
        }
        else if (grid[y][x] === 1) {
          image(stoneImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
        else if (grid[y][x] === 2) {
          image(chestImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
        else if (grid[y][x] === 9) {
          image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
          player1.display();
          player1.update();
          
        
          
        }
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


