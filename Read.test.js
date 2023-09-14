// const { expect } = require("chai");
// const sinon = require("sinon");
// const AWS = require("aws-sdk");
// const lambda = require("./Read.js"); // Replace with the actual path to your Lambda file

// describe("Read Blog Post Tests", function () {
//   let getStub;

//   before(function () {
//     // Stub the AWS DynamoDB.DocumentClient get method
//     getStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, "get");
//   });

//   after(function () {
//     // Restore the stub after all tests are done
//     getStub.restore();
//   });

//   it("should read a blog post successfully", async function () {
//     const event = {
//       pathParameters: {
//         Postid: "1", // Provide the postid you want to read
//       },
//     };

//     // Stub the get method to resolve successfully with a sample item
//     getStub.returns({
//       promise: () =>
//         Promise.resolve({
//           Item: {
//             postId: "3",
//             Author: "Sample Author",
//             Content: "Sample Content",
//             Title: "Sample Title",
//           },
//         }),
//     });

//     const result = await lambda.read(event);

//     expect(result.statusCode).to.equal(200);
//     expect(JSON.parse(result.body)).to.deep.equal({
//       postId: "1",
//       Author: "Sample Author",
//       Content: "Sample Content",
//       Title: "Sample Title",
//     });
//   });

//   it("should handle a case when a blog post is not found", async function () {
//     const event = {
//       pathParameters: {
//         Postid: 1, // Provide a postid that does not exist
//       },
//     };

//     // Stub the get method to resolve successfully with no item found
//     getStub.returns({
//       promise: () => Promise.resolve({}),
//     });

//     const result = await lambda.read(event);

//     expect(result.statusCode).to.equal(404);
//     expect(JSON.parse(result.body)).to.deep.equal({
//       message: "Blog post not found",
//     });
//   });

//   it("should handle errors when reading a blog post", async function () {
//     const event = {
//       pathParameters: {
//         Postid: "1", // Provide the postid you want to read
//       },
//     };

//     // Stub the get method to reject with an error
//     getStub.returns({
//       promise: () => Promise.reject(new Error("Simulated error")),
//     });

//     const result = await lambda.read(event);

//     expect(result.statusCode).to.equal(500);
//     expect(JSON.parse(result.body)).to.deep.equal({
//       error: "Failed to retrieve blog post",
//     });
//   });
// });

const { expect } = require("chai");
const sinon = require("sinon");
const AWS = require("aws-sdk");
const lambda = require("./Read"); // Replace with the actual path to your Lambda file

describe("Lambda Function Tests", function () {
  let docClientStub;

  beforeEach(function () {
    // Create a stub for DynamoDB.DocumentClient.get
    docClientStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, "get");
  });

  afterEach(function () {
    // Restore the stub after each test
    docClientStub.restore();
  });

  it("should retrieve a blog post successfully", async function () {
    // Set up the stub to resolve with a sample response
    docClientStub.returns({
      promise: () =>
        Promise.resolve({
          Item: {
            postId: "1",
            author: "SampleAuthor",
            content: "SampleContent",
            title: "SampleTitle",
          },
        }),
    });

    const event = {
      pathParameters: {
        Postid: "1",
      },
    };

    const result = await lambda.read(event);

    expect(result.statusCode).to.equal(200);
    expect(JSON.parse(result.body)).to.deep.equal({
      postId: "1",
      author: "SampleAuthor",
      content: "SampleContent",
      title: "SampleTitle",
    });
  });

  it("should return a 404 error for a non-existent blog post", async function () {
    // Set up the stub to resolve with an empty response
    docClientStub.returns({
      promise: () => Promise.resolve({}),
    });

    const event = {
      pathParameters: {
        Postid: g,
      },
    };

    const result = await lambda.read(event);

    expect(result.statusCode).to.equal(404);
    expect(JSON.parse(result.body)).to.deep.equal({
      message: "Blog post not found",
    });
  });

  it("should handle errors when retrieving a blog post", async function () {
    // Set up the stub to reject with an error
    docClientStub.returns({
      promise: () => Promise.reject(new Error("Simulated error")),
    });

    const event = {
      pathParameters: {
        Postid: "1",
      },
    };

    const result = await lambda.read(event);

    expect(result.statusCode).to.equal(500);
    expect(JSON.parse(result.body)).to.deep.equal({
      error: "Failed to retrieve blog post",
    });
  });
});
