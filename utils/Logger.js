import fs from "fs";

class Logger {
  constructor() {
    if (Logger.instance == null) {
      Logger.instance = this;
    }
    this.emoji = {
      new: String.fromCodePoint(0x2694),
      attack: String.fromCodePoint(0x1f525),
      death: String.fromCodePoint(0x1f480),
      winner: String.fromCodePoint(0x1f3c6),
    };
    return Logger.instance;
  }

  log(message, emoji) {
    let myEmoji;
    switch (emoji) {
      case "new":
        myEmoji = this.emoji.new;

        break;
      case "attack":
        myEmoji = this.emoji.attack;

        break;
      case "death":
        myEmoji = this.emoji.death;

        break;
      case "winner":
        myEmoji = this.emoji.winner;

        break;

      default:
        myEmoji = "";
        break;
    }

    return console.log(`${myEmoji} ${message}`);
  }
}

const logger = new Logger();
Object.freeze(logger);
export default logger;
