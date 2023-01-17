//import { Grid, BreadthFirstFinder } from 'pathfinding';
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
let dragonGif;
let monsterImg;
let interactE;
let health = 20;
let maxHealth = 20;




function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  //place player in grid
  // eslint-disable-next-line no-unde
  player1 = new Sprite(0, 0, survivorImg);
  monster1 = new Monster(0, 0, monsterImg)
  grid = survivMap1;
  //monster1.moveTowards(0.1,player1.x, player1.y, 0.001);
 
        
  

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
  chestImg = loadImage("chestb.png");
  dragonGif = loadImage("dragon.gif");
  interactE = loadImage("pickkup.webp");
  monsterImg = loadImage("zombieWalk.gif")
  

}

function draw() {
  background(220);
  displayGrid(grid);
  
  player1.update();
  player1.display();
  //updateHealth(player1.x, player1.y, health, maxHealth);
  
  //monster1.moveTowards(player1.x, player1.y, 0.005);
  // for (let monster1 of monsters) {
  //   monster1.display();
  // }


  
}


function keyPressed() {

  if (keyCode === "g"){
    knifeGif.play();
  }


}

function mousePressed() {
  
  // eslint-disable-next-line no-undef
  
  let someBullet = new Bullet(player1.x, player1.y, 0, 5,player1, bulletImg);
  player1.bulletArray.push(someBullet);
    
  
}

function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      //if close enough {
      if (grid[y][x] === 0) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
          
      }
      else if (grid[y][x] === 1) {
        image(stoneImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        image(chestImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        
          
      }
      else if (grid[y][x] === 3) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        image(dragonGif, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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


    
  
// let monsters = [];
// let xPos = Math.floor(this.x/cellWidth);
// let yPos = Math.floor(this.y/cellHeight);
// setInterval(spawnMonster, 5000);

// function spawnMonster() {
//   let a = random(xPos * cellWidth);
//   let b = random(yPos * cellHeight);
//   // Check if the position is not in an obstacle
//   if (noObstacleAt(a, b)) {
//     let newMonster = new Monster(a, b);
//     monsters.push(newMonster);
//   }
// }
  



// function noObstacleAt(a, b) {
  
//   if (grid[Math.floor(this.y/cellHeight)][Math.floor(this.x/cellWidth)] === 1) {
//   if (grid[y][x] === 1) {
//     return false;
      
//   }
//   return true;
// } 



