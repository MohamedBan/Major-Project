class HealthBar {
    constructor(currentHealth, maxHealth) {
      this.currentHealth = currentHealth;
      this.maxHealth = maxHealth;
    }
  
    update(newHealth) {
      this.currentHealth = newHealth;
    }
  }
  const healthBar = new HealthBar(100, 100);
  healthBar.update(80);
<div id="health-bar" style="width: 80%">
</div>