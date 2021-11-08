const querystring = require("querystring");
const fetch = require("node-fetch");

export default async function getImage(req, res) {
  const API_KEY = process.env.PIXABAY_API_KEY;

  const query = querystring.stringify({
    key: API_KEY,
    q: "red+shirt",
    category: "fashion",
    image_type: "photo",
    safesearch: true,
    per_page: "3",
  });

  const URL = "https://pixabay.com/api/?" + query;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (parseInt(data.totalHits) > 0) {
        res.status(200).json(data.hits[0]);
      } else {
        console.log("No hits");
        res.status(401);
      }
    });
}
