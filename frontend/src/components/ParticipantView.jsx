import React, { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useParticipant } from '@videosdk.live/react-sdk';
import WebcamOff from '../assets/icons/WebcamOff';
import { googleAPIKey } from '../secrets';

function ParticipantView(props) {
	const micRef = useRef(null);
	const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
		useParticipant(props.participantId);

	const videoStream = useMemo(() => {
		props.setIsWebCamEnabled(webcamOn);
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(webcamStream.track);
			return mediaStream;
		}
	}, [webcamStream, webcamOn, props]);

	useEffect(() => {
		props.setIsMicEnabled(micOn);
		if (micRef.current) {
			if (micOn && micStream) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(micStream.track);

				let mediaRecorder = new MediaRecorder(mediaStream);

				// Assuming you have a Blob named audioBlob
				var reader = new FileReader();

				reader.onload = async function () {
					var base64String = reader.result.split(',')[1];
					const rawdata = {
						config: {
							encoding: 'MP3',
							sampleRateHertz: 16000,
							languageCode: 'en-US',
						},
						audio: {
							content: base64String,
						},
					};
					const json = await fetch(
						`https://speech.googleapis.com/v1/speech:recognize?key=${googleAPIKey}`,
						{
							method: 'POST',
							body: JSON.stringify(rawdata),
							headers: {
								'Content-Type': 'application/json',
							},
						},
					).then((res) => res.json());
					console.log(json);
					const transcriptedText =
						json.results && json.results.length > 0
							? json.results[0].alternatives[0].transcript
							: null;
					console.log(transcriptedText);
          if(transcriptedText) {
            const translate = await fetch(
              `https://translation.googleapis.com/language/translate/v2?key=${googleAPIKey}`,
              {
                method: 'POST',
                body: JSON.stringify({
                  q: transcriptedText,
                  target: 'fr',
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            ).then((res) => res.json());
            console.log(translate);
			props.setTranslation((prev) => [...prev, {transcription: transcriptedText, translation: translate.data.translations[0].translatedText}]);
          }
					// Now you can use the base64String as needed
				};

				// Event handler when data is available
				mediaRecorder.ondataavailable = async (event) => {
					if (event.data.size > 0) {
						// Convert the data to a Blob
						const audioBlob = new Blob([event.data], {
							type: 'audio/raw',
						}); // Adjust the MIME type as needed
						reader.readAsDataURL(audioBlob);
					}
				};

				mediaRecorder.onstop = () => {
					mediaRecorder = new MediaRecorder(mediaStream);
					mediaRecorder.start();
				};

				micRef.current.srcObject = mediaStream;
				micRef.current
					.play()
					.catch((error) =>
						console.error('videoElem.current.play() failed', error),
					);

				// Start recording
				mediaRecorder.start();

				setInterval(() => {
					mediaRecorder.stop();
				}, 5000);
			} else {
				micRef.current.srcObject = null;
			}
		}
	}, [micStream, micOn, props]);

	return (
		<div key={props.participantId} className='w-full bg-transparent flex flex-col'>
			<audio ref={micRef} autoPlay muted={isLocal} />
			{webcamOn ? (
				<ReactPlayer
					//
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					//
					url={videoStream}
					//
					onError={(err) => {
						console.log(err, 'participant video error');
					}}
					width='100%'
					height='100%'
					className='flex justify-center'
				/>
			) : (
				<div className='flex justify-center items-center p-5'>
					<WebcamOff height='100%' width='100%' />
				</div>
			)}
			<p className='flex justify-end'>Participant: {displayName}</p>
		</div>
	);
}

export default ParticipantView;
