const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.update = async (event) => {
    try {
      const params = {
        TableName: "Blogposts",
        Key: {
          postId: event.postid,
        },
        UpdateExpression: "set Author = :author, Content = :content, Title = :title",
        ExpressionAttributeValues: {
          ":author": event.author,
          ":content": event.content,
          ":title": event.title,
        },
        ReturnValues: "UPDATED_NEW",
      };
  
      const result = await docClient.update(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update blog post" }),
      };
    }
  };
  