const chartAggregation = `[
  {
    "$addFields": {
      "created": {
        "$cond": {
          "if": {
            "$eq": [
              {
                "$type": "$created"
              },
              "date"
            ]
          },
          "then": "$created",
          "else": null
        }
      }
    }
  },
  {
    "$addFields": {
      "__alias_0": {
        "year": {
          "$year": "$created"
        },
        "month": {
          "$subtract": [
            {
              "$month": "$created"
            },
            1
          ]
        }
      }
    }
  },
  {
    "$group": {
      "_id": {
        "__alias_0": "$__alias_0"
      },
      "__alias_1": {
        "$sum": "$total"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "__alias_0": "$_id.__alias_0",
      "__alias_1": 1
    }
  },
  {
    "$project": {
      "x": "$__alias_0",
      "y": "$__alias_1",
      "_id": 0
    }
  },
  {
    "$sort": {
      "x.year": 1,
      "x.month": 1
    }
  },
  {
    "$limit": 5000
  }
]`;

export default chartAggregation;
