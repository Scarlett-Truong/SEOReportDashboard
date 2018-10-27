const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./private_key.json');
const getCurrentDate = require('./utils/getCurrentDate.js')

const sheetId = '1PPltu2T7DprNqhJbdX9ndKYQ-navxPc4IT3hQ5jPWos';

const gtmetrix = require ('gtmetrix') ({
    email: 'truongt8@student.douglascollege.ca',
    apikey: 'eb5db35e7e792206a5c192b4dc1af037'
});

  // Run test from London with Google Chrome
const testDetails = {
    url: urlTest,
    location: 1,
    browser: 3
};
  
const gtm = {
    loadTime: 0,
    pageSize:0,
    requests: 0,
    speedScore: 0,
    ySlow: 0
};
  
const callGtmApi = new Promise((resolve, reject) => {
    try{
        gtmetrix.test.create (testDetails).then (data =>
        gtmetrix.test.get(data.test_id, 5000).then(response => {
            gtm.loadTime = response.results.fully_loaded_time/1000;
            gtm.pageSize = response.results.page_bytes/1000;
            gtm.requests = response.results.page_elements;
            gtm.speedScore = response.results.pagespeed_score,
            gtm.ySlow = response.results.yslow_score
            console.log("Getting data from GTMetrix Api");
            resolve(gtm);
        }));
    } catch (e) {
      reject(e);
    }
});