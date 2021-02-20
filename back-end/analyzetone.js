const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const url = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/ea9c979b-20f3-4d57-8ead-cd95e900ef36'
const key = '55bSeiSLL-E_MhveNAmifQYZIhAkrkByvcs76e7qRKze'

function analyzetone(text) {
    const toneAnalyzer = new ToneAnalyzerV3({
        version: '2017-09-21',
        authenticator: new IamAuthenticator({
          apikey: key,
        }),
        serviceUrl: url,
      });

      const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
      };
      
      toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
          console.log(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch(err => {
          console.log('error:', err);
        });    
}

module.exports = {
    analyzetone
}
