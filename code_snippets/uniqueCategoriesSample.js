
const uniqueCategoriesSample = 
`let collection = context.services.get("mongodb-atlas").db("store").collection("products");
return collection.distinct("category");`

export default uniqueCategoriesSample;