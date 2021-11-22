const searchSample = `// Node.js Driver

import clientPromise from "../lib/mongodb";

function searchProducts() {
  const client = await clientPromise;
  const db = client.db("store");
  const collection = db.collection("products");
  
  const pipeline = [
    {
      $search: {
        index: "searchProducts",
        text: {
          query: arg,
          path: {
            'wildcard': '*'
          },
          fuzzy: {}
        },
      },
    },
  ];

  return collection.aggregate(pipeline);
}`;

export default searchSample;
