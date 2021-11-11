const dataAPIsample = `// No Driver!!

async function getAllProducts() {
  const response = await fetch(\`https://data.mongodb-api.com/app/data-zxdey/endpoint/v1/beta/action/find\`,
  {
    method: "POST"
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": \${API_KEY}
    },
    body: {
      "database": "store", 
      "collection": "products", 
      "dataSource": "mongodb-atlas"
    }
  });
  const products = await response.json();

  return products;
}`;

export default dataAPIsample;
