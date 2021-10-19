const allProductsSample = 
`let collection = context.services.get("mongodb-atlas").db("store").collection("products");
return collection.find({});`

export default allProductsSample;