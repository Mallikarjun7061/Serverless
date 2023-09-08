const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.delete = async (event) => {
    try {
      const params = {
        TableName: "Blogposts",
        Key: {
          postId: event.postid,
        },
      };
  
      await docClient.delete(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Blog post deleted successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to delete blog post" }),
      };
    }
  };
  