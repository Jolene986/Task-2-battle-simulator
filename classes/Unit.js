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
  }
  // set damage
  setDamage() {
   this.damage = this.health / 100
   return this.damage;
   
    
    
  }

  // set critical


  //set rechargeTime
  setTime() {
    return (this.rechargeTime = (this.health / 100) * 1000);
  }

  recharging() {
    
    if (this.health <= 0) {
      return;
    }
    if (units.length === 1) {
      logger.log(`WINNER IS ${units[0].name}`, "winner");
      return;
    }
    this.setTime();
    this.timer = setTimeout(() => {
      
      this.attackRandomOpponent();
    }, this.rechargeTime);
  }

  stopTimer() {
    this.health === 0 && clearTimeout(this.timer);
    console.log(`${this.name} tajmer je stopiran`);
  }

  attackRandomOpponent() {
    

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

    
    console.log(`Number of survivors: ${units.length}`);
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
    console.log(`Attacker is ${this.name} width ${this.health.toFixed(2)} life remaining`);
    console.log(`Opponent is ${opponent.name} width ${opponent.health.toFixed(2)} life remaining`);

    return (this.opponent = opponent);
  }

  doDamage() {
    

    logger.log(`${this.name} is ATTACKING ${this.opponent.name}`, "attack");

    // calculate critical chance and set Critical Damage
    // if (randomGenerator(101) >= 50) {
    
    

let critical = (10 - (this.opponent.health / 10)) * config.criticalFactor; 

this.criticalDamage = critical;







 


    this.setDamage(); 
    let damage = this.damage;
    let totalDamage = parseFloat(damage) + this.criticalDamage;
 


    this.opponent.setHealth(this.opponent.health - totalDamage);
    logger.log(
      `${String.fromCodePoint(0x26a1)} Critical Damage:${this.criticalDamage} and regular damage is ${this.damage}`
    );
    logger.log(`Total Damage inflicted: ${totalDamage}`);
  }
  checkIfDead() {
    // if dead splice i stop opponent timer
    if (this.opponent.health <= 0) {
      let idx = units.findIndex((item) => item.health <= 0);
      
      if (idx !== -1) {
        
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
}
