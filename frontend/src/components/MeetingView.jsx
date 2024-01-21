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
	const [translation, setTranslation] = useState([]);

	return (
		<div>
			{joined && joined === 'JOINED' ? (
				<div className='flex'>
					<div className='flex flex-col items-center'>
						<div className='flex justify-center'>
							{[...participants.keys()].map((participantId) => (
								<ParticipantView
									participantId={participantId}
									key={participantId}
									setIsWebCamEnabled={setIsWebCamEnabled}
									setIsMicEnabled={setIsMicEnabled}
									translation={translation}
									setTranslation={setTranslation}
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
							{
								translation.map((t) => (
									<div className='chat-bubble w-full'>
										{t.transcription}
										<div className='divider my-2'></div>
										{t.translation}
									</div>
								))
							}
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
