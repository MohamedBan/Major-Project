// Define variables
let player;
let zombies = [];
let bullets = [];
let zombieSpeed = 1;
let zombieCount = 10;
let score = 0;

// Setup function
function setup() {
  createCanvas(800, 600);
  player = new Player();
  for (let i = 0; i < zombieCount; i++) {
    zombies.push(new Zombie(random(width), random(height)));
  }
}

// Draw function
function draw() {
  background(220);
  // Move the player
  player.move();

  // Update and display the zombies
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].move(player.x, player.y, zombieSpeed);
    zombies[i].display();
    // If the zombie touches the player, the game is over
    if (zombies[i].touches(player)) {
      textSize(32);
      textAlign(CENTER);
      fill(255, 0, 0);
      text("GAME OVER", width / 2, height / 2);
      noLoop();
    }
  }

  // Update and display the bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].move();
    bullets[i].display();
    // Remove the bullet if it's offscreen
    if (bullets[i].offscreen()) {
      bullets.splice(i, 1);
    } else {
      // Check if the bullet hits any of the zombies
      for (let j = zombies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(zombies[j])) {
          zombies.splice(j, 1);
          bullets.splice(i, 1);
          score++;
          break;
        }
      }
    }
  }

  // Display the score
  textSize(24);
  textAlign(RIGHT);
  fill(0);
  text("Score: " + score, width - 10, 30);
}

// Key pressed function
function keyPressed() {
  if (keyCode === 32) {
    bullets.push(new Bullet(player.x, player.y, player.angle));
  }
}

// Player class
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.angle = 0;
    this.speed = 5;
  }

  move() {
    // Rotate the player based on the mouse position
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    // Move the player based on keyboard input
    if (keyIsDown(87)) { // W
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }
    if (keyIsDown(83)) { // S
      this.x -= this.speed * cos(this.angle);
      this.y -= this.speed * sin(this.angle);
    }
    if (keyIsDown(65)) { // A
      this.x += this.speed * cos(this.angle - PI / 2);
      this.y += this.speed * sin(this.angle - PI / 2);
    }
    if (keyIsDown(68)) { // D
      this.x += this.speed * cos(this.angle + PI / 2);
      this.y += this.speed * sin(this.angle + PI / 2);
    }
    // Constrain the player to the canvas
    this.x = constrain(this.x, 0);
