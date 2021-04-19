import logger from "../utils/Logger.js";
import randomGenerator from "../utils/randomGenerator.js";
import config from "../config.js";
import { units } from "../index.js";

export default class Unit {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.damage = this.setDamage();
    this.criticalDamage = 0;
    this.rechargeTime;
    this.timer;
    this.opponent = {};

    logger.log(`The ${this.name} has just been created`, "new");
  }
  // set health
  setHealth(num) {
    this.health = num < 0 ? 0 : num;
    if (this.health <= 0) {
      logger.log(`${this.name} is dead!`, "death");
    }
    console.log(`iz set helth helth ${this.health}`);
  }
  // set damage
  setDamage() {
    return (this.damage = this.health / 100);
  }

  // set critical
  setCritical(opponentHealth) {
    return (this.critical = 10 - (opponentHealth / 10) * config.criticalFactor);
  }

  //set rechargeTime
  setTime() {
    return (this.rechargeTime = (this.health / 100) * 1000);
  }

  recharging() {
    console.log(`RECHARGE FUNC`);
    if (this.health <= 0) {
      return;
    }
    if (units.length === 1) {
      logger.log(`WINNER IS ${units[0].name}`, "winner");
      return;
    }
    this.setTime();
    this.timer = setTimeout(() => {
      console.log(`Vreme tajmera ${this.rechargeTime} `);
      this.attackRandomOpponent();
    }, this.rechargeTime);
  }

  stopTimer() {
    this.health === 0 && clearTimeout(this.timer);
    console.log(`${this.name} tajmer je stopiran`);
  }

  attackRandomOpponent() {
    console.log(`ATTACK FUNCTION`);

    // is this unit dead
    if (this.health <= 0) {
      return;
    }
    //select random opponent
    this.selectOpponent();

    // attack opponent
    this.doDamage();

    //check if opponent dead
    this.checkIfDead();

    // svejedno pozivamo this.recharge

    console.log(`KRAJ ATTACKA`);
    console.log(` units niz je sada ${units}`);
    this.recharging();
  }

  selectOpponent() {
    if (units.length === 1) {
      logger.log(`WINNER IS ${units[0].name}`, "winner");

      return;
    }

    let opponent = units[randomGenerator(units.length)];
    if (this.name === opponent.name) {
      this.selectOpponent();
      return;
    }
    //check if opponent already dead because during the random opponent finding some other unit could kill it

    if (opponent.health <= 0) {
      this.selectOpponent();
      return;
    }
    console.log(`Napadac je je ${this.name}`);
    console.log(`opponent je ${opponent.name}`);

    return (this.opponent = opponent);
  }

  doDamage() {
    console.log(`DO DAMAGE FUNC i opponent je ${this.opponent.name}`);

    logger.log(`${this.name} is ATTACKING ${this.opponent.name}`, "attack");

    // calculate critical chance and set Critical Damage
    if (randomGenerator(101) >= 50) {
      this.setCritical(this.opponent.health);
    }
    let damage = this.damage + this.criticalDamage + 20;
    console.log(`CRITICAL ${this.criticalDamage}`);
    this.opponent.setHealth(this.opponent.health - damage);
    logger.log(
      `${String.fromCodePoint(0x26a1)} Critical Damage:${this.criticalDamage}`
    );
    logger.log(` Total Damage inflicted :${damage} `);
  }
  checkIfDead() {
    // if dead splice i stop opponent timer
    if (this.opponent.health <= 0) {
      let idx = units.findIndex((item) => item.health <= 0);
      console.log(`index je ${idx}`);
      if (idx !== -1) {
        console.log(`usao u if za dead opponent`);
        console.log(`iz ded ifa ${units[0].name}`);
        units.splice(idx, 1);
      }
      this.opponent.stopTimer();
    }
  }

  //create units

  static createUnits(numOfUnits) {
    let units = [];
    for (let i = 1; i <= numOfUnits; i++) {
      let unit = new Unit(`Unit${i}`);
      units.push(unit);
    }
    let survivors = [...units];

    return survivors;
  }
  test() {
    console.log("test");
  }
}
