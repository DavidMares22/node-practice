const { rejects } = require("assert");
const https = require("https");
// https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}

function getMovieTitles(substr) {
  let titles = [];
  let total_pages;

  let request = new Promise((resolve, reject) => {
    https
      .get(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=1`,
        (resp) => {
          let data = "";

          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            json = JSON.parse(data);
            resolve(json);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });

  request
    .then((data) => {
      data.data.map((el) => {
        titles.push(el.Title);
      });
      console.log(titles);
    })
    .catch((error) => {
      console.log(error);
    });
}

getMovieTitles("spiderman");
// getMovieTitles("water");
