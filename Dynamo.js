const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and desired region
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_ID',
  secretAccessKey: 'YOUR_ACCESS_KEY',
  region: 'us-east-1', // Change to your desired region
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();
// Define the table schema
const params = {
  TableName: 'Blogposts',
  KeySchema: [
    { AttributeName: 'postId', KeyType: 'HASH' }, // Partition key
    
  ],
  
  AttributeDefinitions: [
    { AttributeName: 'postId', AttributeType: 'S' }, // String data type
    
    // Other attributes...
  ],
  
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, // Adjust as needed
    WriteCapacityUnits: 5, // Adjust as needed
  },
};

// Create the DynamoDB table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully:', data);
  }
});
