const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  try {
    // Define the DynamoDB parameters for putting an item

    const params = {
      TableName: "Blogposts", // Replace with your DynamoDB table name

      Item: {
        postId: event.postid,
        Author: event.author,
        Content: event.content,
        Title: event.tilte
      },
    };

    // Put the item into DynamoDB

    await docClient.put(params).promise();

    return {
      statusCode: 200,

      body: JSON.stringify({ message: "Blog post created successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,

      body: JSON.stringify({ error: "Failed to create blog post" }),
    };
  }
};

