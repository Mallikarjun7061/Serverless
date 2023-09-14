const { expect } = require("chai");
const sinon = require("sinon");
const AWS = require("aws-sdk");
const lambda = require("./Update.js"); // Replace with the actual path to your Lambda file

describe("Update Blog Post Tests", function () {
  let updateStub;

  before(function () {
    // Stub the AWS DynamoDB.DocumentClient update method
    updateStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, "update");
  });

  after(function () {
    // Restore the stub after all tests are done
    updateStub.restore();
  });

  it("should update a blog post successfully", async function () {
    const event = {
      body: JSON.stringify({
        postid: "1",
        author: "Updated Author",
        content: "Updated Content",
        title: "Updated Title",
      }),
    };

    // Stub the update method to resolve successfully
    updateStub.returns({
      promise: () =>
        Promise.resolve({
          Attributes: {
            postId: "1",
            Author: "Updated Author",
            Content: "Updated Content",
            Title: "Updated Title",
          },
        }),
    });

    const result = await lambda.update(event);

    expect(result.statusCode).to.equal(200);
    expect(JSON.parse(result.body)).to.deep.equal({
      postId: "1",
      Author: "Updated Author",
      Content: "Updated Content",
      Title: "Updated Title",
    });
  });

  it("should handle errors when updating a blog post", async function () {
    const event = {
      body: JSON.stringify({
        postid: ww,
        author: "Updated Author",
        content: "Updated Content",
        title: "Updated Title",
      }),
    };

    // Stub the update method to reject with an error
    updateStub.returns({
      promise: () => Promise.reject(new Error("Simulated error")),
    });

    const result = await lambda.update(event);

    expect(result.statusCode).to.equal(500);
    expect(JSON.parse(result.body)).to.deep.equal({
      error: "Failed to update blog post",
    });
  });
});