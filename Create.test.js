const { expect } = require("chai");
const sinon = require("sinon");
const AWS = require("aws-sdk");

const lambda = require("./Create"); // Replace with the actual path to your Lambda file

describe("Lambda Function Tests", function () {
  let putStub;

  before(function () {
    // Stub the AWS DynamoDB.DocumentClient put method
    putStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, "put");
  });

  after(function () {
    // Restore the stub after all tests are done
    putStub.restore();
  });

  it("should create a blog post successfully", async function () {
    const event = {
      body: JSON.stringify({
        postid: "1",
        author: "",
        content: "",
        title: "",
        // postid: gf,
        // author: fd,
        // content: td,
        // title: jhj,
      }),
    };

    // Stub the put method to resolve successfully
    putStub.returns({
      promise: () => Promise.resolve("Successfully put item into DynamoDB"),
    });

    const result = await lambda.create(event);

    expect(result.statusCode).to.equal(200);
    expect(JSON.parse(result.body)).to.deep.equal({
      message: "Blog post created successfully",
    });
  });

  it("should handle errors when creating a blog post", async function () {
    const event = {
      body: JSON.stringify({
        // postid: gf,
        // author: fd,
        // content: td,
        // title: jhj,
        // postid: "1",
        // author: "",
        // content: "",
        // title: "",
      }),
    };

    // Stub the put method to reject with an error
    putStub.returns({
      promise: () => Promise.reject(new Error("Simulated error")),
    });

    const result = await lambda.create(event);

    expect(result.statusCode).to.equal(500);
    expect(JSON.parse(result.body)).to.deep.equal({
      error: "Failed to create blog post",
    });
  });
});
