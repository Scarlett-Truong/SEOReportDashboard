const getCurrentDate = require('./getCurrentDate');
const config = require('../config');

const getHtmlFileName = () => {
    let fileName = '';
    const url_split = config.urlTest.split( '/' );
    
    
        fileName = `${url_split[2]}_${getCurrentDate()[3]}.html`;
    
    
    
    return fileName;
}

// console.log(getHtmlFileName());
module.exports = getHtmlFileName;