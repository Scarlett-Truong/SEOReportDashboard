const fs = require('fs');
const {google} = require('googleapis');
const drive = google.drive("v3");
const key = require("./private_key.json");
const path = require("path");
const folderId = "1UUrk2kYU735RZxZakHaNJS1cMd9wEaJT";

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
    } else {
        console.log("Authorization accorded");
    }
});

const fileMetadata = {
    'name': 'text.txt',
    parents: [folderId]
};
const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream(path.join(__dirname, './text.txt'))
};

// drive.files.create({
//     auth: jwToken,
//     resource: fileMetadata,
//     media: media,
// }, function(err, res) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('File id: ' + res.data.id);
//     }
// })

// drive.files.update({
//     auth: jwToken,
//     resource: fileMetadata,
//     media: media,
//     fileId : '14kVRVSCwBy0G4NmMH_t2rJAacL6Ag7xt'
// }, function(err, file) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('File Id: ', file.id);
//     }
// })

drive.files.delete({
    auth: jwToken,
    fileId: '1K4tM-zeIbsmHp6N0QqxvLbDD0UhKLKSg'
});
// https://drive.google.com/open?id=1K4tM-zeIbsmHp6N0QqxvLbDD0UhKLKSg