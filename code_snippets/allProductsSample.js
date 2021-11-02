const allProductsSample = `import clientPromise from "../lib/mongodb";

function getAllProducts() {
  const client = await clientPromise;
  const db = client.db("store");
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();

  return products;
}`;

export default allProductsSample;
