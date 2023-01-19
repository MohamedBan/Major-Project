

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
let monster2;
let angle = 0;
let popX;
let popY;
let bulletDx = 1;
let bulletDy = 1;




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
  
  monsterImg = loadImage("zombieWalk.gif");
  

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  //place player in grid
  // eslint-disable-next-line no-unde
  
  player1 = new Fighter(0, 0, survivorImg);
  
  //monster1 = new Monster(0, 0, monsterImg)
  // monster2 = new Sprite(cellWidth, cellHeight,32, 32 );
  // monster2.addAni("walk", monsterImg);
  
  grid = survivMap1;
  //monster2.moveTowards(0.1,player1.x, player1.y, 0.001);
 
        
  

}

function draw() {
  background(220);
  displayGrid(grid);
  
  player1.update();
  player1.display();
  //updateHealth(player1.x, player1.y, health, maxHealth);
  
  // monster2.moveTowards(player1.x, player1.y, 0.005);
  for (let monster1 of monsters) {
    monster1.display();
  }
  // if (player1.state === true){
  //   push();
  //   translate(player1.x, player1.y);
  //   rotate(player1.angle);
    
  //   pop();
    
  // }
  if (popX && popY){
    image(interactE, popX, popY, cellWidth,cellHeight);
  }
}


function keyPressed() {
  let a = random(100);
  if (key === "g"){
    knifeGif.play();
  }
  if(popX && popY && key === "e"){
    if(a<= 25){
      player1.dx += 1;
    }
    else if(a<= 50){
      player1.dy += 1;
    }
    else if(a<= 75){
      bulletDx += 1;
    }
    else {
      bulletDy += 1;
    }
    


    let xPos = (popX -10)/ cellWidth;
    let yPos = (popY +20)/ cellHeight;
    grid[yPos][xPos] = 0;
    popX = undefined;
    popY = undefined;
    
  }


}

function mousePressed() {
  
  // eslint-disable-next-line no-undef
  
  let someBullet = new Bullet(player1.x, player1.y, player1, bulletImg, player1.state);
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


    
  
let monsters = [];

setInterval(spawnMonster, 1000);

function spawnMonster() {
  let a;
  let b;
  a = random(width);
  b = random(height);
  // Check if the position is not in an obstacle
  while (noObstacleAt(a, b)) {
    let newMonster = new Monster(a, b, monsterImg);
    monsters.push(newMonster);
    a = random(width);
    b = random(height);
  }

  
}
  



function noObstacleAt(a, b) {
  
  if (grid[Math.floor(b/cellHeight)][Math.floor(a/cellWidth)] !== 1) {
    return true;
      
  }
  return false;
} 



