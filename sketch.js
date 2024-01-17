// my variables
const ROWS = 30;
const COLS = 30;
let grid;
let cellWidth;
let cellHeight;
let screen = "begin";
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
let bulletDx = 2;
let bulletDy = 2;
let monster;
let monsters = [];
let state = "trial";
let startScreen;
let gameOver;
let startSound;
let idleSound;
let endSound;
let mute;
let state1 = "yes";
let volume1;
let boss;
let underling;


//loads images
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
  startScreen = loadImage("startscreen.jpg");
  monsterImg = loadImage("zombieWalk.gif");
  gameOver = loadImage("game-over.jpg");
  startSound = loadSound("Startsound.mp3");
  idleSound = loadSound("idleSound.mp3");
  endSound = loadSound("end.mp3");
  mute = loadImage("button.png");
  volume1 = loadImage("volume.png");
  boss = loadImage("orc.png")
  underling = loadImage("goblin4.png")
}


//initalizes my grid and player
function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  player1 = new Fighter(70, 45, survivorImg);
  console.log(survivMap1);
  grid = survivMap1;
}



function draw() {
  //displays background
  if (screen === "begin"){
    if (state1 === "yes"){
      start();
    }
    else if (state1 === "no"){
      start1();
    }
  }
  
  else if (screen === "idle"){
    //plays sound
    displayGrid(grid);
    startSound.stop();
    idleSound.playMode("UntilDone");
    idleSound.play();
    player1.update();
    player1.display();

    //keeps on pathfinding for every monster
    for (let i = 0; i < monsters.length; i++) {
      moveTowardsPlayer(monsters[i], player1);
      monsters[i].display();

      //checks collision between monster and player
      if (collideRectRect(player1.x, player1.y, cellWidth*0.5, cellHeight*0.5, monsters[i].x, monsters[i].y, cellWidth*0.5, cellHeight*0.5)) {
        health-= 0.1;
      }

      //displays a "e" button near loot chest
      if (popX && popY){
        image(interactE, popX, popY, cellWidth,cellHeight);
      }
    }

    //if healh is 0 switch state to game over
    if (health <= 0){
      screen = "end";
    }
  }

  //plays sound and switch background
  else{
    idleSound.stop();
    endSound.playMode("UntilDone");
    endSound.play();
    end();

  }
}


// if you get near loot chest and press e depending on "a" you get extra speed
function keyPressed() {
  let a = random(100);
  if(popX && popY && key === "e"){
    if(a<= 25){
      player1.dx += 0.5;
    }
    else if(a<= 50){
      player1.dy += 0.5;
    }
    else if(a<= 75){
      bulletDx += 0.5;
    }
    else {
      bulletDy += 0.5;
    }
    
    let xPos = (popX -10)/ cellWidth;
    let yPos = (popY +20)/ cellHeight;
    grid[yPos][xPos] = 0;
    popX = undefined;
    popY = undefined;
    
  }
  if (key === "g"){

  }
}


// changes states and add new bullets
function mousePressed() {
  if (state1 === "yes" && mouseInsideRect(1275, 1350, 700, 770)){
    state1 = "no";
  }

  else if (state1 === "no" && mouseInsideRect(1275, 1350, 700, 770)){
    state1 = "yes";
  }

  else if(!mouseInsideRect(1275, 1350, 700, 770)){
    screen = "idle";
  }
  
  let someBullet = new Bullet(player1.x, player1.y, player1, bulletImg, player1.state);
  player1.bulletArray.push(someBullet); 
}



// display images based on numbers on grid
function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {

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
      else if (grid[y][x] === 4) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        image(boss, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 5) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        image(underling, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        player1.display();
        player1.update(); 
      }
    }
  }
}


//makes grid depending on cols and rows
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


//spawn monster every 5 seconds
setInterval(spawnMonster, 1000);



//selects random location on grid if not a wall then add monster
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


//if grid location is not a wall then return true
function noObstacleAt(a, b) {
  
  if (grid[Math.floor(b/cellHeight)][Math.floor(a/cellWidth)] !== 1) {
    return true;
      
  }
  return false;
} 


// start screen with mute
function start(){
  startSound.stop();
  image(startScreen, 0, 0, windowWidth, windowHeight);
  textSize(32);
  textFont("georgia");
  text("click to start", windowWidth/2 - 90, windowHeight/2 + 20);
  fill("yellow");
  image(mute, 1275, 700, 70, 70);
} 


//start screen without mute
function start1(){
  startSound.playMode("UntilDone");
  startSound.play();
  image(startScreen, 0, 0, windowWidth, windowHeight);
  textSize(32);
  textFont("georgia");
  text("click to start", windowWidth/2 - 90, windowHeight/2 + 20);
  fill("yellow");
  image(volume1, 1275, 700, 70, 70);
  
}  


// game over screen 
function end(){
  image(gameOver, 0, 0, windowWidth, windowHeight);
}  


//pathfinding algorithim 
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
        if (currentNode.x + i < 0 || currentNode.x + i >= COLS || currentNode.y + j < 0 || currentNode.y + j >= ROWS || i === 0 && j === 0) {
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
        }
        else{
          // add the new node to the open list
          openList.push(newNode);
        }
      }
    }
  }
}

// Returns an array of objects with x,y properties of input node and its parents
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

//troubleshooting purposes
function loadProgress() {
  let progress = startSound.bytesLoaded / startSound.bytesTotal;
  console.log("Loading progress: " + progress);
}

//checks if mouse is inside the paramters
function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

