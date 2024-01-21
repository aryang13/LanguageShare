import React, { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useParticipant } from '@videosdk.live/react-sdk';
import WebcamOff from '../assets/icons/WebcamOff';

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

				micRef.current.srcObject = mediaStream;
				micRef.current
					.play()
					.catch((error) =>
						console.error('videoElem.current.play() failed', error),
					);
			} else {
				micRef.current.srcObject = null;
			}
		}
	}, [micStream, micOn, props]);

	return (
		<div key={props.participantId} className='w-full h-full bg-neutral-500'>
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
