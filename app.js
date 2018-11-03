const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./private_key.json');
const lhData = require('./lighthouseApi');
const gmtApi = require('./gtmApi');
const wptApi = require('./webPageTestApi');

const sheetId = '1ZdZyq-pq7f9U5xPFyOUBzdulWTpAAeyMn2gbCjVPAME';

const doc = new GoogleSpreadsheet(sheetId);
gmtApi.then(gtmData => {
    doc.useServiceAccountAuth(creds, function (authErr) {
        //Check authentication
        if (authErr) {
            console.log('Authentication error: ' + Autherr); 
        }

        //Add Lighthouse data to sheet 1
        doc.addRow(1,
            lhData, 
            function(err) {
            if(err) {
                console.log('Error adding Lighthouse data in sheet 1: ' + err);
            }
            else {
                console.log('Succeed adding data in sheet 1')
            }
        })
        
        
        // Add Lighthouse, GTM data graph to sheet 2
        doc.addRow(2, { 
            'Date': lhData['Date'],
            'Url': lhData['Url'],
            'Time': gtmData['GTM-date-time'],
            'Title': 'Percent',
            'Performance': lhData['LH-performance-score'],
            'PWA': lhData['LH-pwa-score'],
            'Accessibility': lhData['LH-accessibility-score'],
            'Best Practices': lhData['LH-best-practice-score'],
            'SEO': lhData['LH-seo-score'],
            'Page Speed Score': gtmData['GTM-page-speed-score'],
            'YSLow Score': gtmData['GTM-yslow-score'],
        }, function(err) {
            if(err) {
                console.log('Error adding percent data in sheet 2: ' + err);
            }
            else {
                console.log('Succeed adding percent data in sheet 2')
            }
        })
        doc.addRow(2, { 
            'Date': lhData['Date'],
            'Url': lhData['Url'],
            'Time': gtmData['GTM-date-time'],
            'Title': 'Remain',
            'Performance': 100 - lhData['LH-performance-score'],
            'PWA': 100 - lhData['LH-pwa-score'],
            'Accessibility': 100 - lhData['LH-accessibility-score'],
            'Best Practices': 100 - lhData['LH-best-practice-score'],
            'SEO': 100 - lhData['LH-seo-score'],
            'Page Speed Score': 100 -gtmData['GTM-page-speed-score'],
            'YSLow Score': 100 - gtmData['GTM-yslow-score']
        }, function(err) {
            if(err) {
                console.log('Error adding remaining data in sheet 2: ' + err);
            }
            else {
                console.log('Succeed adding remaining data in sheet 2')
            }
        })

        //Add GTM data graph to sheet 3
        doc.addRow(3, 
            gtmData,
            function(err) {
            if(err) {
                console.log('Error adding GTM data in sheet 3: ' + err);
            }
            else {
                console.log('Succeed adding data in sheet 3')
            }
        })
    });
})

wptApi.then( (wptData) => {
    doc.useServiceAccountAuth(creds, function (authErr) {
        //Check authentication
        if (authErr) {
            console.log('Authentication error: ' + Autherr); 
        }

        //Add WebPageTest data to sheet 4
        doc.addRow(4, 
            wptData,
            function(err) {
            if(err) {
                console.log('Error adding GTM data in sheet 4: ' + err);
            }
            else {
                console.log('Succeed adding data in sheet 4')
            }
        })
    });
})
