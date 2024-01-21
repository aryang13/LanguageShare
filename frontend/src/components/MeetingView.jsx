import React, { useState } from 'react';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import Controls from './Controls';
import ParticipantView from './ParticipantView';

function MeetingView(props) {
	const [joined, setJoined] = useState(null);
	const { join } = useMeeting();
	const { participants } = useMeeting({
		onMeetingJoined: () => {
			setJoined('JOINED');
		},
		onMeetingLeft: () => {
			props.onMeetingLeave();
		},
	});
	const joinMeeting = () => {
		setJoined('JOINING');
		join();
	};

	const { webcamOn, micOn } = useParticipant(props.participantId);
	const [isWebCamEnabled, setIsWebCamEnabled] = useState(webcamOn);
	const [isMicEnabled, setIsMicEnabled] = useState(micOn);

	return (
		<div>
			{joined && joined === 'JOINED' ? (
				<div className='flex'>
					<div className='flex flex-col justify-center items-center'>
						<div className='flex justify-center'>
							{[...participants.keys()].map((participantId) => (
								<ParticipantView
									participantId={participantId}
									key={participantId}
									setIsWebCamEnabled={setIsWebCamEnabled}
									setIsMicEnabled={setIsMicEnabled}
								/>
							))}
						</div>
						<Controls
							webcamOn={isWebCamEnabled}
							micOn={isMicEnabled}
						/>
					</div>
					<div className='text-pretty break-words w-1/5 p-4'>
						<p>Translation:</p>
						<p></p>
						<div className='chat chat-start'>
							<div className='chat-bubble'>
								Hello how are you? My name is Allen nice to meet
								you.
								<div className='divider my-2'></div>
								¿Hola, cómo estás? Mi nombre es Allen, un placer
								conocerlo. tú.
							</div>
						</div>
					</div>
				</div>
			) : joined && joined === 'JOINING' ? (
				<p>Joining the meeting...</p>
			) : (
				<button onClick={joinMeeting}>Join</button>
			)}
		</div>
	);
}

export default MeetingView;
