

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
let monster;
let monsters = [];
let state = false;



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
  console.log(survivMap1);
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
  
  for (let i = 0; i < monsters.length; i++) {
    moveTowardsPlayer(monsters[i], player1);
    monsters[i].display();
    
    if (collideRectRect(player1.x, player1.y, cellWidth*0.5, cellHeight*0.5, monsters[i].x, monsters[i].y, cellWidth*0.5, cellHeight*0.5)) {
      health-= 0.1;
    }
    if (monsters[i]>= 5){
      state = true;
    }


    }

    // if (health <= 0){
    //   alert("game over")
    // }
  
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


    
  


if (state === false){
  setInterval(spawnMonster, 1000);


}

function spawnMonster() {
  let a;
  let b;
  a = random(width);
  b = random(height);
  // Check if the position is not in an obstacle
  while (noObstacleAt(a, b)) {
    let newMonster = new Monster(a, b, monsterImg);
    monsters.push(newMonster);
    moveTowardsPlayer(newMonster, player1);
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



// let walls = new Group();
// for (let y = 0; y < ROWS; y++) {
//   for (let x = 0; x < COLS; x++) {
//     if (grid[y][x] === 1) {
//       let wall = createSprite(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
//       wall.setCollider("rectangle", 0, 0, cellWidth, cellHeight);
//       walls.add(wall);
//     }
//   }
// }

function moveTowardsPlayer(monster, player) {
  let dx = player.x - monster.x;
  let dy = player.y - monster.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 5) {
    let newX = monster.x + dx * 0.05;
    let newY = monster.y + dy * 0.05;
    let xPos = floor(newX / cellWidth);
    let yPos = floor(newY / cellHeight);
    if (grid[yPos][xPos] !== 1) {
      monster.x = newX;
      monster.y = newY;
    }
  }
  
  if (!grid || !monsters) {
    return;
  }
  for (let monster1 of monsters) {
    monster1.display();
  }
  let openList = [];
  let closedList = [];
  
  // initialize the starting position of the monster with f, g and h values
  let startNode = {x: monster.x, y: monster.y, g: 0, h: abs(monster.x - player.x) + abs(monster.y - player.y), f: 0, parent: null};
  openList.push(startNode);

  while (openList.length > 0) {
    // Find the node with the lowest F cost
    let lowestIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let currentNode = openList[lowestIndex];
    
    if(currentNode.x < 0 || currentNode.x > grid[0].length - 1 || currentNode.y < 0 || currentNode.y > grid.length - 1){
      return;
  }
    // If the current node is the player's position, we've found a path
    if (currentNode.x === player.x && currentNode.y === player.y) {
      let path = reconstructPath(currentNode);
      moveAlongPath(path, monster);  // pass the monster object as a parameter
      return;
    }

    // Remove the current node from the open list and add it to the closed list
    openList.splice(lowestIndex, 1);
    closedList.push(currentNode);

    // Check all neighboring nodes
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // Skip nodes that are out of bounds or are the current node
        if (currentNode.x + i < 0 || currentNode.x + i >= COLS || currentNode.y + j < 0 || currentNode.y + j >= ROWS || (i === 0 && j === 0)) {
          continue;
        }
        if (currentNode.x + i < 0 || currentNode.x + i >= grid[0].length || currentNode.y + j < 0 || currentNode.y + j >= grid.length) {
          continue;
        } 

        // Skip nodes that are obstacles
        if (grid[currentNode.y + j][currentNode.x + i] === 1) {
          continue;
        }
        
        // Create a new node for the neighboring position
        let newNode = {x: currentNode.x + i, y: currentNode.y + j, g: currentNode.g + 1, h: abs(currentNode.x + i - player.x) + abs(currentNode.y + j - player.y), f: 0, parent: currentNode};
        newNode.f = newNode.g + newNode.h;
        
        // Check if the new node is in the closed list
        let inClosedList = false;
        for (let k = 0; k < closedList.length; k++) {
          if (newNode.x === closedList[k].x && newNode.y === closedList[k].y) {
            inClosedList = true;
            break;
          }
        }
        if (inClosedList) {
          continue;
        }

                // check if the new node is already in the open list
                let inOpenList = false;
                let indexInOpenList = -1;
                for (let k = 0; k < openList.length; k++) {
                  if (newNode.x === openList[k].x && newNode.y === openList[k].y) {
                    inOpenList = true;
                    indexInOpenList = k;
                    break;
                  }
                }
        
                if(inOpenList){
                  if(newNode.g < openList[indexInOpenList].g){
                    openList[indexInOpenList].g = newNode.g;
                    openList[indexInOpenList].f = openList[indexInOpenList].g + openList[indexInOpenList].h;
                    openList[indexInOpenList].parent = currentNode;
                  }
                }else{
                  // add the new node to the open list
                  openList.push(newNode);
                }
              }
            }
          }
        }
        
function reconstructPath(node) {
  let path = [];
  path.push({x: node.x, y: node.y});
  while (node.parent) {
    node = node.parent;
    path.unshift({x: node.x, y: node.y});
    }
 return path;
}
        
        // function to move along the path
function moveAlongPath(path) {
  if (path.length > 0) {
    monster.moveTo(path[0].x * cellWidth + cellWidth / 2, path[0].y * cellHeight + cellHeight / 2);
    path.shift();
  }
}

