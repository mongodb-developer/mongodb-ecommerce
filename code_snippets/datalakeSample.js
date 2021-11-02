const datalakeSample = `{
  "databases": [
    {
      "name": "store",
      "collections": [
        {
          "name": "products",
          "dataSources": [
            {
              "path": "/",
              "storeName": "datalake-bucket-codestackr"
            },
            {
              "collection": "products",
              "database": "store",
              "storeName": "Cluster0"
            }
          ]
        }
      ],
      "views": []
    }
  ],
  "stores": [
    {
      "provider": "s3",
      "bucket": "datalake-bucket-codestackr",
      "delimiter": "/",
      "name": "datalake-bucket-codestackr",
      "region": "us-east-1"
    },
    {
      "provider": "atlas",
      "clusterName": "Cluster0",
      "name": "Cluster0",
      "projectId": "60faee703fa1167501635581"
    }
  ]
}`;

export default datalakeSample;
