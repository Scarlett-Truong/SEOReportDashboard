const jsonData = require('./lighthouse.report.json');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./private_key.json');
const getCurrentDate = require('./utils/getCurrentDate.js')

const sheetId = '1ZdZyq-pq7f9U5xPFyOUBzdulWTpAAeyMn2gbCjVPAME';

const lhData = {
    'Date': getCurrentDate()[0],
    'Month': getCurrentDate()[1],
    'Url': jsonData.finalUrl,
    'Path':'',
    'LH-date-time': jsonData.fetchTime,
    'LH-score-scale-low':'',
    'LH-score-scale-high': '',
    'LH-seo-score': jsonData.categories.seo.score*100,
    'LH-best-practice-score': jsonData.categories['best-practices'].score*100, 
    'LH-accessibility-score': jsonData.categories.accessibility.score*100, 
    'LH-pwa-score': jsonData.categories.pwa.score*100,
    'LH-performance-score': jsonData.categories.performance.score*100, 
    'LH-performance-fcp-s' : (jsonData.audits['first-contentful-paint'].rawValue/1000).toFixed(1),
    'LH-performance-fcp-scale': '',
    'LH-performance-speed-index-s': (jsonData.audits["speed-index"].rawValue/1000).toFixed(1),
    'LH-performance-speed-index-scale' : '',
    'LH-performance-tti-s' : (jsonData.audits.interactive.rawValue/1000).toFixed(1), 
    'LH-performance-tti-scale' : '',
    'LH-html-file-name' : '',
    'LH-link-name': 'Current Lighthouse Report',
    'LH-html-link': '',
    'LH-device':'Emulated Nexus 5X',
    'LH-network-throttling': `${jsonData.configSettings.throttling.rttMs} ms TCP RTT, ${jsonData.configSettings.throttling.throughputKbps} Kbps throughput (${jsonData.configSettings.output.throttlingMethod})`,
    'LH-CPU-throttling': `${jsonData.configSettings.throttling.cpuSlowdownMultiplier}x slowdown (${jsonData.configSettings.output.throttlingMethod})`,
    'LH-User-agent-host': jsonData.environment.hostUserAgent,
    'LH-User-agent-network' : jsonData.environment.networkUserAgent,
    'LH-cpu-memory-power': parseInt(jsonData.environment.benchmarkIndex) 
}

const doc = new GoogleSpreadsheet(sheetId);
doc.useServiceAccountAuth(creds, function (authErr) {
    if (authErr) {
        console.log('Authentication error: ' + Autherr); 
    }
    doc.addRow(1,lhData, function(err) {
        if(err) {
            console.log('Error adding Lighthouse data : ' + err);
        }
    })
    
    doc.addRow(2, { 
        Date: getCurrentDate()[0],
        Month: getCurrentDate()[1],
        Title: jsonData.finalUrl,
        Performance: (jsonData.audits["speed-index"].rawValue/1000).toFixed(2),
        
    }, function(err) {
        if(err) {
            console.log('Error adding row: ' + err);
        }
    })
});
