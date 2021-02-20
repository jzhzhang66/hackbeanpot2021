const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const url = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/ea9c979b-20f3-4d57-8ead-cd95e900ef36'
const key = '55bSeiSLL-E_MhveNAmifQYZIhAkrkByvcs76e7qRKze'

async function analyzetone(text) {
    let toneResults;
    const tones = {
        anger: 0,
        fear: 0, 
        joy: 0, 
        sadness: 0, 
        analytical: 0, 
        confident: 0, 
        tentative: 0
    }
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

      await toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
          toneResults = toneAnalysis
        })
        .catch(err => {
          console.log('error:', err);
        });

    const sentenceTones = toneResults.result.sentences_tone
    for (var i = 0; i < sentenceTones.length; i++) {
        const currTones = sentenceTones[i].tones
        for (var j = 0; j < currTones.length; j++) {
            const score = currTones[j].score 
            switch(currTones[j].tone_id) {
                case 'anger':
                    tones.anger = tones.anger + score
                    break;
                case 'fear':
                    tones.fear = tones.fear + score 
                    break;
                case 'joy':
                    tones.joy = tones.joy + score
                    break;
                case 'sadness': 
                    tones.sadness = tones.sadness + score
                    break;
                case 'analytical': 
                    tones.analytical = tones.analytical + score
                    break;
                case 'confident':
                    tones.confident = tones.confident + score
                    break;
                case 'tentative': 
                    tones.tentative = tones.tentative + score 
                    break;
            }
        }
    }
    const len = sentenceTones.length
    tones.anger = tones.anger / len
    tones.fear = tones.fear / len
    tones.joy = tones.joy / len
    tones.sadness = tones.sadness / len
    tones.analytical = tones.analytical / len
    tones.confident = tones.confident / len
    tones.tentative = tones.tentative / len

    return tones 
}

module.exports = {
    analyzetone
}