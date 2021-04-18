import config from "./config.js";
import Unit from "./classes/Unit.js";
//import Battle from "./classes/Battle.js";

export let units;

units = Unit.createUnits(config.numOfUnits);
units.map((el) => el.attackRandomOponent());
