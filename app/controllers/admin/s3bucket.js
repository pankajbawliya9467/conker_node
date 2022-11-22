//services
const responses = require('../../middleware/responses');
const multer = require('multer');
var fs = require('fs');
const AWS = require('aws-sdk');


//Modal

// Multer
var image;
var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'images/category/')
      },
      filename: function (req, file, cb) {
        imagename = Date.now() + '.png';
        image=imagename;
        cb(null, imagename)
      } 
    })
})

//-------------------------------  addCategory ---
exports.uploads3 = async (req, res) => {


    const s3 = new AWS.S3({
        accessKeyId: 'AKIAST2IXIKI5ZRYAESB',
        secretAccessKey: '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'
    });

    uploadFile('C:/Users/Pankaj Bawliya/Pictures/test.png');
   
    // console.log("aws in working");
} 

const uploadFile = (fileName) => {
    console.log("s3 is working");

    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    console.log(fileContent)

    const s3 = new AWS.S3({
        accessKeyId: 'AKIAST2IXIKI5ZRYAESB',
        secretAccessKey: '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'
    });

    // const data =  s3.getObject(
    //     {
    //         Bucket: 'dev-notesapp-assets',
    //         Key: 'admintest.png'
    //       }
        
    //   );
    //   console.log(data);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'dev-notesapp-assets',
        Key: 'admintest1.png', // File name you want to save as in S3
        Body: fileContent,
        ACL: 'public-read'
        // ACL: 'public-read-write',
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully.`,data);
    });
};


