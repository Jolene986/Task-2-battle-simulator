import config from "./config.js";
import Unit from "./classes/Unit.js";
//import Battle from "./classes/Battle.js";

export let units;
if (
  typeof config.numOfUnits !== "number" ||
  config.numOfUnits > 5 ||
  config.numOfUnits < 2
) {
  throw new Error(
    `Check your config.js numOfUnits MUST be a number between 2 and 5`
  );
} else if (
  typeof config.criticalFactor !== "number" ||
  config.criticalFactor < 2 ||
  config.criticalFactor > 5
) {
  throw new Error(
    `Check your config.js criticalFactor MUST be a number between 2 and 5`
  );
} else {
  units = Unit.createUnits(config.numOfUnits);
  units.map((unit) => unit.attackRandomOpponent());
}
