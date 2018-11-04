const getCurrentDate = require('./utils/getCurrentDate.js');
const config = require('./config.js');

const gtmetrix = require ('gtmetrix') ({
    email: 'truongt8@student.douglascollege.ca',
    apikey: 'eb5db35e7e792206a5c192b4dc1af037'
});

// Run test from London with Google Chrome
const testDetails = {
    url: config.urlTest,
    location: 1,
    browser: 3
};
  
const gtmApi = new Promise((resolve, reject) => {
    try{
        gtmetrix.test.create (testDetails).then (data =>
            // resolve(data)
            gtmetrix.test.get(data.test_id, 5000).then(response => {
                const gtmData = {
                    'Date': getCurrentDate()[0],
                    'Url': config.urlTest,
                    'Report-path': response.results.report_url,
                    'Date-time': getCurrentDate()[2],
                    'Month': getCurrentDate()[1],
                    'GTM-date-time': new Date(),    
                    'GTM-page-speed-score': response.results.pagespeed_score,
                    'GTM-page-speed-grade': '',
                    'GTM-page-speed-avg-score': ''	,
                    'GTM-yslow-score': response.results.yslow_score,
                    'GTM-yslow-grade': '',
                    'GTM-yslow-avg-score': '',
                    'GTM-fully-loaded': (response.results.fully_loaded_time/1000),
                    'GTM-fully-loaded-avg': '',
                    'GTM-page-size-bytes': response.results.page_bytes,
                    'GTM-page-size-avg': '',
                    'GTM-requests': response.results.page_elements,
                    'GTM-requests-avg' : '',
                    'GTM-timing-ttfb': (response.results.html_load_time/1000),
                    'GTM-timing-contentful-paint': (response.results.first_contentful_paint_time/1000),
                    'GTM-timing-onload': (response.results.onload_time/1000),
                    'GTM-screenshot-image-path': response.resources.screenshot,
                    'GTM-video-path': response.resources.video,
                    'GTM-video-embet-snippet': ''
                }
                console.log("Getting data from GTMetrix Api");
                resolve(gtmData);
            })
        );
    } catch (e) {
        reject(e);
    }
});

module.exports = gtmApi;

