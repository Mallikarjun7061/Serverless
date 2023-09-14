const { expect } = require("chai");
const sinon = require("sinon");
const AWS = require("aws-sdk");
const lambda = require("./Delete.js"); // Replace with the actual path to your Lambda file

describe("Delete Blog Post Tests", function () {
  let deleteStub;

  before(function () {
    // Stub the AWS DynamoDB.DocumentClient delete method
    deleteStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, "delete");
  });

  after(function () {
    // Restore the stub after all tests are done
    deleteStub.restore();
  });

  it("should delete a blog post successfully", async function () {
    const event = {
      body: JSON.stringify({
        postid: "1", // Provide the postid you want to delete
      }),
    };

    // Stub the delete method to resolve successfully
    deleteStub.returns({
      promise: () => Promise.resolve({}),
    });

    const result = await lambda.delete(event);

    expect(result.statusCode).to.equal(200);
    expect(JSON.parse(result.body)).to.deep.equal({
      message: "Blog post deleted successfully",
    });
  });

  it("should handle errors when deleting a blog post", async function () {
    const event = {
      body: JSON.stringify({
        postid: d, // Provide the postid you want to delete
      }),
    };

    // Stub the delete method to reject with an error
    deleteStub.returns({
      promise: () => Promise.reject(new Error("Simulated error")),
    });

    const result = await lambda.delete(event);

    expect(result.statusCode).to.equal(500);
    expect(JSON.parse(result.body)).to.deep.equal({
      error: "Failed to delete blog post",
    });
  });
});