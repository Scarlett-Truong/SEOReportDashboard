const fs = require('fs');
const {google} = require('googleapis');
const drive = google.drive("v3");
const key = require("./private_key.json");
const path = require("path");
// const folderId = "1UUrk2kYU735RZxZakHaNJS1cMd9wEaJT"; //folder test

const renameFile = (oldName, newName) => {
    return new Promise ( (resolve,reject) => {
        fs.rename(oldName, newName, function (err) {
            if (err) reject(err);
            console.log('Renamed HTML file');
        });
    }); 
}


const jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ["https://www.googleapis.com/auth/drive"],
    null
);
 
jwToken.authorize((authErr) => {
    if (authErr) {
        console.log("error : " + authErr);
        return;
    } 
});

const uploadFile = (fileName, folderId) => {
  return new Promise ( (resolve, reject) => {
      const fileMetadata = {
          'name': fileName,
          parents: [folderId]
      };
      const media = {
          mimeType: 'text/html',
          body: fs.createReadStream(path.join(__dirname, fileName))
      };
  
      drive.files.create({
          auth: jwToken,
          resource: fileMetadata,
          media: media,
      }, function(err, res) {
          if (err) {
              console.error('Error uploading file: '+err);
              reject(err);
          } else {
              resolve(res.data.id);
              console.log(`File id: ${res.data.id} - File name: ${fileName}`);
          }
      })
  });
}

const fileHandler = (oldName, fileName, folderId) => {
    return Promise.all([renameFile(oldName,fileName),uploadFile(fileName,folderId)]).catch(err => {console.log(err)})
};
module.exports = fileHandler;

// fileHandler(oldName,fileName,folderId);


// const deleteLocalFile = new Promise ( (resolve, reject) => {
//     fs.exists(`./${fileName}`, function(exists) {
//         if(exists) {
//           fs.unlinkSync(`./${fileName}`);   
//           console.log('File deleted.');
//           resolve();       
//         } else {
//           reject('File not found.')
//         }
//     });
// });


/*
const updateFile = (id) => {
    drive.files.update({
        auth: jwToken,
        resource: fileMetadata,
        media: media,
        // fileId : '14kVRVSCwBy0G4NmMH_t2rJAacL6Ag7xt'
        fileId : id
    }, function(err, file) {
        if (err) {
            console.error('Error updating file'+err);
        } else {
            console.log('File Id: ', file.data.id);
        }
    })
}

const deleteFile = (id) => {
    drive.files.delete({
        auth: jwToken,
        // fileId: '1K4tM-zeIbsmHp6N0QqxvLbDD0UhKLKSg'
        fileId: id
    });
}
*/
