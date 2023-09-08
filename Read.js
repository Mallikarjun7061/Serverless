const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.read = async (event) => {
    try {
      const params = {
        TableName: "Blogposts",
        Key: {
          postId: event.postid,
        },
      };
  
      const result = await docClient.get(params).promise();
  
      if (result.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.Item),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Blog post not found" }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to retrieve blog post" }),
      };
    }
  };
  