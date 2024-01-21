import React, { useState, useRef, useEffect } from 'react';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import Controls from './Controls';
import ParticipantView from './ParticipantView';

function MeetingView(props) {
	const [joined, setJoined] = useState(null);
	const { join } = useMeeting();
	const lastChildRef = useRef(null);

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

	useEffect(() => {
		if (lastChildRef.current) {
			lastChildRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [translation]);

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
					<div className='text-pretty break-words p-4 min-w-64 max-w-72 h-screen overflow-y-scroll'>
						<div className='chat chat-start gap-2'>
							{translation.map((t) => (
								<div
									className='chat-bubble w-full'
									ref={lastChildRef}
								>
									{t.transcription}
									<div className='divider my-2'></div>
									{t.translation.replace('&#39;', "'")}
								</div>
							))}
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
