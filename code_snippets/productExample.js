const productExample = {
  _id: { $oid: "617a9ab87051d8d84082e7f8" },
  tags: [],
  likes: ["123321", "232122", "1232123", "d03k1231", "1231kdf1"],
  created: { $date: { $numberLong: "1635424951646" } },
  update: { $date: { $numberLong: "1635424951646" } },
  usersBought: [],
  code: "app1100",
  name: "Licensed Steel Mouse tee-shirt",
  inventory: { onHand: { $numberInt: "10" }, disableAtZero: false },
  sale_attributes: { featured: false, new: false, trending: false, sale: true },
  title: "MongoDB Practical salmon Licensed Steel Mouse tee-shirt",
  slug: "mongodb-practical-salmon-licensed-steel-mouse-tee-shirt",
  description: "Hic fuga maxime et.",
  taxable: true,
  shippable: true,
  price: { $numberInt: "1232" },
  cost: { $numberInt: "833" },
  Product_Group: "Apparel",
  category: "Apparel",
  Attributes: [
    { Name: "color", Value: "salmon" },
    { Name: "brand", Value: "MongoDB" },
    { Name: "Fabric", Value: "paper" },
    { Name: "Price", Value: "1232" },
  ],
  imagePath: "/img/tee-shirt-clothes.jpg",
  options: [],
  categories: [],
  salesYTD: [],
  salesYearMonth: [],
  __v: { $numberInt: "0" },
};

export default productExample;
