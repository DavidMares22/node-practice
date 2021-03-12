const path = require("path");
const fs = require("fs");

class Card {
  static async add(course) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[idx]

    if (candidate) {
      candidate.count++
      card.courses[idx] = candidate
    }else{
      course.count = 1
      card.courses.push(course)
    }

    card.price += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });

  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "card.json"),
        "utf-8",
        (err, content) => {
          err ? reject(err) : resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = Card;
