const fs = require('fs');
const {google} = require('googleapis');
const drive = google.drive("v3");
const key = require("./private_key.json");
const path = require("path");
const folderId = "1UUrk2kYU735RZxZakHaNJS1cMd9wEaJT";
const config = require('./config');
const getCurrentDate = require('./utils/getCurrentDate');
const fileName = `${config.urlTest}_${getCurrentDate()[3]}`;


// if(fs.existsSync('lighthouse.report.html')) {
//     renameFile();
//     uploadFile();
// }
// else {
//     console.log('HTML file does not exist');
// }


    fs.rename('lighthouse.report.html', fileName, function (err) {
        if (err) throw err;
        console.log('Renamed HTML file');
    });


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
        } else {
            console.log('File id: ' + res.data.id);
        }
    })


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

