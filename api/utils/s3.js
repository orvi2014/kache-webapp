const AWS = require('aws-sdk');

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId:process.env.AWS_KEY_ID, // stored in the .env file
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // stored in the .env file
  region: process.env.AWS_REGION, // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const Bucket = process.env.AWS_RESOURCE_BUCKET;

// In order to create pre-signed GET adn PUT URLs we use the AWS SDK s3.getSignedUrl method.
// getSignedUrl(operation, params, callback) ⇒ String
// GET URL Generator
const fileName = (name) =>{
    return name.trim().replace(/\s/g, '')+'-'+Date.now();
  };

export const generateGetUrl = async (stream)=>{

    const image = await stream;
    const rename = fileName(image.filename);
    const params = {
        Bucket: Bucket,
        Key: rename,
        Body: image.createReadStream(),
        ACL: 'public-read',
        ContentType: image.mimetype,
      };
    console.log(image);
    const link=   s3
        .upload(params)
        .promise()
    return link;
}

// PUT URL Generator
export const generatePutUrl = async (Key, ContentType)=> {
  return new Promise((resolve, reject) => {
    // Note Bucket is retrieved from the env variable above.
    const params = { Bucket, Key, ContentType };
    // Note operation in this case is putObject

    s3.getSignedUrl('putObject', params, function (err, url) {
      if (err) {
        reject(err);
      }
      // If there is no errors we can send back the pre-signed PUT URL
      resolve(url);
    });
  });
}