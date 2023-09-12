const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.update = async (event) => {
    const data1 = JSON.parse(event.body);
    try {
      const params = {
        TableName: "Blogposts",
        Key: {
          postId: data1.postid,
        },
        UpdateExpression: "set Author = :author, Content = :content, Title = :title",
        ExpressionAttributeValues: {
          ":author": data1.author,
          ":content": data1.content,
          ":title": data1.title,
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
  