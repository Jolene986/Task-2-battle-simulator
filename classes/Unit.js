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
    this.rechargeTime = this.setTime();
    this.timer;
    this.oponent = {};

    logger.writeLog(`The ${this.name} has just been created`);
  }
  // set health
  set setHealth(num) {
    this.health = num;
  }
  // set damage
  setDamage() {
    return (this.damage = this.health / 100);
  }

  // set critical (usualy in games is dependant on the oponents health)
  setCritical(oponentHealth) {
    return (this.critical = 10 - (oponentHealth / 10) * config.n);
  }

  //set rechargeTime
  setTime() {
    return (this.health / 100) * 1000;
  }

  recharging() {
    console.log(`RECHARGE FUNC`);
    if (this.health <= 0) {
      return;
    }
    if (units.length === 1) {
      console.log(
        `unitlenght je ${units.length} a pobednik je ${units[0].name}`
      );
      return;
    }

    this.timer = setTimeout(() => {
      console.log(`Vreme tajmera ${this.rechargeTime} `);
      this.attackRandomOponent();
    }, 3000);
  }

  stopTimer() {
    this.health === 0 && clearTimeout(timer);
    console.log(`${this.name} tajmer je stopiran`);
  }

  attackRandomOponent() {
    console.log(`ATTACK FUNCTION`);

    // is this unit dead
    if (this.health <= 0) {
      return;
    }
    //select random oponent
    this.selectOponent();

    // attack oponent
    this.doDamage();

    //check if oponent dead
    this.checkIfDead();

    // svejedno pozivamo this.recharge

    console.log(`KRAJ ATTACKA`);
    console.log(` units niz je sada ${units}`);
    this.recharging();
  }

  selectOponent() {
    if (units.length === 1) {
      console.log(
        `unitlenght je ${units.length} a pobednik je ${units[0].name}`
      );
      return;
    }

    let oponent = units[randomGenerator(units.length)];
    if (this.name === oponent.name) {
      this.selectOponent();
      return;
    }
    //check if oponent already dead jer dok smo mi randomovali neko drugi ga je mogao ubiti

    if (oponent.health <= 0) {
      this.selectOponent();
      return;
    }
    console.log(`Napadac je je ${this.name}`);
    console.log(`oponent je ${oponent.name}`);

    return (this.oponent = oponent);
  }

  doDamage() {
    console.log(`DO DAMAGE FUNC i oponent je ${this.oponent.name}`);
    // calculate critical chance and set Critical Damage
    // if (randomGenerator(101) >= 50) {
    //   this.setCritical(oponent.health);
    // }
    let damage = this.damage + this.criticalDamage + 40;
    this.oponent.health = this.oponent.health - damage;
    console.log(`damage ovoliko: ${damage} na oponenta ${this.oponent.name}`);
    console.log(`do damage func oponent health je: ${this.oponent.health}`);
  }
  checkIfDead() {
    // if dead splice i stop oponent timer
    if (this.oponent.health <= 0) {
      let idx = units.findIndex((item) => item.health <= 0);
      console.log(`index je ${idx}`);
      if (idx !== -1) {
        console.log(`usao u if za dead oponent`);
        console.log(`iz ded ifa ${units[0].name}`);
        units.splice(idx, 1);
      }
      this.oponent.stopTimer();
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
