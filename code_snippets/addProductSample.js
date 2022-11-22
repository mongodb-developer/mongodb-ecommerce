const addProductSample = `// Node.js Driver

import clientPromise from "../lib/mongodb";

function addProduct(product) {
  const client = await clientPromise;
  const db = client.db("store");
  const collection = db.collection("products");
  const insertProduct = await collection.insertOne({
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image
  });

  return insertProduct;
}`;

export default addProductSample;
