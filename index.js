const https = require("https");
// https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}

function getPage(substr, page_number) {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${page_number}`,
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
}

async function requestMovie(substr) {
  let titles = [];
  let total_pages;
  let current_page = 1;

  do {
    try {
      let data = await getPage(substr, current_page);

      total_pages = data.total_pages;
      data.data.map((el) => {
        titles.push(el.Title);
      });
      console.log(current_page);
      current_page += 1;
    } catch (error) {
      // Promise rejected
      console.log(error);
      break;
    }
  } while (current_page <= total_pages);

  console.log(titles.sort());
}

requestMovie("spiderman");

// requestMovie("water");
