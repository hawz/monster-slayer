new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.logTurn(true, damage)
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.logTurn(true, damage, true)
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });

      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.logTurn(false, damage);
      this.checkWin();
    },
    logTurn: function(isPlayer, damage, special = false) {
      var text = isPlayer ? special ? 'Player hits Monster hard for ' : 'Player hits Monster for ' : 'Monster hits Player for '
      this.turns.unshift({
        isPlayer: isPlayer,
        text: text + damage
      });
    }
  }
});