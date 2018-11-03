const WebPageTest = require('WebPageTest');
const urlTest = 'https://www.westcoastloghomes.com/';

  const wptAuth = new WebPageTest('http://www.webpagetest.org/','A.dd2cd591e2905b1433d7ab0290cadbf8')
  const wptApi = new Promise((resolve, reject) => {
    wptAuth.runTest(urlTest, {
      connectivity: 'Cable',
      location: 'Dulles:Chrome',
      firstViewOnly: false,
      runs: 1,
      pollResults: 5,
      video: true
    }, function processTestResult(err, res) {
        const wptData = {
            'Date': res.data.runs[1].firstView.requests[0].headers.response[9],
            'Url' : res.data.url,
            'Path': res.data.summary,
            'WPT-first-byte-score': res.data.average.firstView['TTFB'],//check
            'WPT-keep-alive-score': res.data.average.firstView['score_keep-alive'],
            'WPT-compress-transfer-score': res.data.average.firstView.score_gzip,
            'WPT-compress-images-score': res.data.average.firstView.score_compress,
            'WPT-cache-static-score': res.data.average.firstView.score_cache,
            'WPT-use-cdn-score': res.data.average.firstView.score_cdn,

            'WPT-first-view-load-time-s': (res.data.average.firstView.loadTime/1000).toFixed(1),
            'WPT-first-view-first-byte-s': res.data.average.firstView['TTFB'],
            'WPT-first-view-start-render-s': (res.data.average.firstView.render/1000).toFixed(1),
            'WPT-first-view-speed-index-s': (res.data.average.firstView.SpeedIndex/1000).toFixed(1),
            "WPT-first-view-doc-complete-time-s": (res.data.average.firstView.docTime/1000).toFixed(1),
            "WPT-first-view-doc-complete-requests" :res.data.average.firstView.requestsDoc,
            "WPT-first-view-doc-complete-bytes" : res.data.average.firstView.bytesInDoc,
            "WPT-first-view-fully-loaded-time-s": (res.data.average.firstView.fullyLoaded/1000).toFixed(1),
            "WPT-first-view-fully-loaded-requests": res.data.average.firstView.requests,
            "WPT-first-view-fully-loaded-bytes": res.data.average.firstView.bytesIn,
            
            'WPT-repeat-view-load-time-s': (res.data.average.repeatView.loadTime/1000).toFixed(1),
            "WPT-repeat-view-first-byte-s": res.data.average.repeatView['TTFB'],
            "WPT-repeat-view-start-render-s": (res.data.average.repeatView.render/1000).toFixed(1),
            "WPT-repeat-view-speed-index-s": (res.data.average.repeatView.SpeedIndex/1000).toFixed(1),
            "WPT-repeat-view-doc-complete-time-s": (res.data.average.repeatView.docTime/1000).toFixed(1),
            "WPT-repeat-view-doc-complete-requests" :res.data.average.repeatView.requestsDoc,
            "WPT-repeat-view-doc-complete-bytes": res.data.average.repeatView.bytesInDoc,
            "WPT-repeat-view-fully-loaded-time-s": (res.data.average.repeatView.fullyLoaded/1000).toFixed(1),
            "WPT-repeat-view-fully-loaded-requests": res.data.average.repeatView.requests,
            "WPT-repeat-view-fully-loaded-bytes": res.data.average.repeatView.bytesIn,
            
            'WPT-render-video-link': '',
            'WPT-link-to-report': res.data.summary,
            'WPT-test-server-location': res.data.location,
        }
    
      resolve(wptData);
    })
  });

  module.exports = wptApi;
