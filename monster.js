class Monster {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  moveTowardsPlayer(playerX, playerY) {
    // Calculate the distance and direction to the player
    const distanceX = playerX - this.x;
    const distanceY = playerY - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const directionX = distanceX / distance;
    const directionY = distanceY / distance;

    // Move the monster towards the player
    this.x += directionX * this.speed;
    this.y += directionY * this.speed;
  }
}

const monster = new Monster(10, 10, 5);
monster.moveTowardsPlayer(20, 20);

function gameLoop() {
  monster.moveTowardsPlayer(player.x, player.y);
  // ... other game logic
}


class Monster {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  moveTowardsPlayer(playerX, playerY) {
    // use a pathfinding algorithm to calculate the shortest path to the player
    // and update the monster's position 
  }
}

    