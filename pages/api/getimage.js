import { getSession } from "@auth0/nextjs-auth0";

const querystring = require("querystring");
const fetch = require("node-fetch");

export default async function getImage(req, res) {
  const API_KEY = process.env.PIXABAY_API_KEY;
  const { search } = req.query;

  const query = querystring.stringify({
    key: API_KEY,
    q: search.replace(/\s/g, "+"),
    category: "fashion",
    image_type: "photo",
    safesearch: true,
    per_page: "3",
  });

  const URL = "https://pixabay.com/api/?" + query;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      if (parseInt(data.totalHits) > 0) {
        res.status(200).json(data.hits[0].webformatURL);
      } else {
        console.log("No hits");
        res.status(401);
      }
    });
}
