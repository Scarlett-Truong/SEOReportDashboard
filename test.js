
const getCurrentDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const min = now.getMinutes();
    const s = now.getSeconds();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthStr = months[now.getMonth()];    
    const yyyymmdd = y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
    const monthyyyy = monthStr + ' '+ y; 
    const yyyymmddhhmmss = y + '-'+ (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d + ' ' + (h < 10 ? '0' : '')+ h + ':' +(min < 10 ? '0' : '')+ min + ':' + (s < 10 ? '0' : '')+s ;
    const arrDate = [yyyymmdd, monthyyyy,yyyymmddhhmmss ]
    return arrDate;
}
// console.log(getCurrentDate()[0]);]

var initial_url = 'http://www.mymainsite.com/path/path/needthispath/somepath';
var url = initial_url .split( '/' );

// var updated_url= document.location.hostname + '/' + url[ url.length - 2 ] + '/' + url[ url.length - 1 ];
// console.log(url[2])

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects']
};

// Usage:
launchChromeAndRunLighthouse('https://example.com', opts).then(results => {
  // Use results!
});