const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.read = async (event) => {

    const {Postid} = event.pathParameters;
    console.log(event.pathParameters)
    try {
      const params = {
        TableName: "Blogposts",
        Key: {
          postId: Postid,
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
// console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to retrieve blog post" }),
      };
    }
  };
  