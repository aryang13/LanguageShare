// @ts-ignore
import * as recorder from 'node-record-lpcm16';
import speech from "@google-cloud/speech"

const client = new speech.SpeechClient({
  keyFilename: '../google-auth.json'
});

const {Translate} = require('@google-cloud/translate').v2;
let target = "fr"

const recognizeStream = client
  .streamingRecognize({
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'En-US',
      enableSpeakerDiarization: true,
      model: 'latest_long',
      diarizationConfig: {
        enableSpeakerDiarization: true,
        minSpeakerCount: 2,
        maxSpeakerCount: 2,
      }
    },
    interimResults: true,
  })
  .on('error', console.error)
  .on('data', async (data) => {
    console.log(`Real time transcript : ${data.results[0]?.alternatives?.[0]?.transcript} [isFinal: ${data.results[0]?.isFinal}]`);
    if (data.results[0]?.isFinal) {
      let text = data.results[0]?.alternatives?.[0]?.words?.map((w: any) => w.word)?.join(' ');
      const translate = new Translate({keyFilename: './google-auth.json'});
      const [translation] = await translate.translate(text, target);
      console.log(`Whole Sentence: ${text}`);
      console.log(`Translation: ${translation}`);
    }
  });


// Create a writable stream to save the captured audio
const audioStream = recorder.record({
  sampleRate: 16000, // Sample rate (adjust as needed)
  channels: 1, // Mono audio
  audioType: 'raw', // Output audio type
}).stream();

audioStream.pipe(recognizeStream);

audioStream.on('end', () => {
  recognizeStream.end();
});

audioStream.on('spawn', () => {
  console.log('spawn');
});