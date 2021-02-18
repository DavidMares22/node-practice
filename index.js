const https = require("https");
// https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}

function getMovieTitles(substr) {
  let titles = [];
  let total_pages;
  
  
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
          // console.log(JSON.parse(data));
          json = JSON.parse(data);
          total_pages = json.total_pages;
          // console.log(total_pages);
          json.data.map((el) => {
            titles.push(el.Title);
          });
          // console.log(titles.sort());
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
  

  

    https
      .get(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=2`,
        (resp) => {
          let data = "";
  
          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });
  
          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            // console.log(JSON.parse(data));
            json = JSON.parse(data);
            total_pages = json.total_pages;
            // console.log(total_pages);
            json.data.map((el) => {
              titles.push(el.Title);
            });
            // console.log(titles.sort());
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  
  

    https
      .get(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=3`,
        (resp) => {
          let data = "";
  
          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });
  
          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            // console.log(JSON.parse(data));
            json = JSON.parse(data);
            total_pages = json.total_pages;
            // console.log(total_pages);
            json.data.map((el) => {
              titles.push(el.Title);
            });
            console.log(titles.sort());
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  
 

 
}

// getMovieTitles("spiderman");
getMovieTitles("water");
