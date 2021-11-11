const uniqueCategoriesSample = `// JavaScript Driver

import clientPromise from "../lib/mongodb";

function getUniqueCategories() {
  const client = await clientPromise;
  const db = client.db("store");
  const collection = db.collection("products");
  const uniqueCategories = await collection.distinct("category").toArray();

  return uniqueCategories;
}`;

export default uniqueCategoriesSample;
