import fs from "fs";

class Logger {
  constructor() {
    if (Logger.instance == null) {
      Logger.instance = this;
    }
    return Logger.instance;
  }

  writeLog(message) {
    /* fs.writeFile("log.txt", message, function (err) {
      if (err) return console.log(err);
      console.log(`${message} > log.txt`);
    });*/

    console.log(message);
  }
}

const logger = new Logger();
Object.freeze(logger);
export default logger;
