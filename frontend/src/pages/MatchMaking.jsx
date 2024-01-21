import React, { useState } from 'react';
import Match from './Match';
import { createMeeting } from '../util/video/conferenceHelpers.js';
import { authToken } from '../secrets';

function MatchMaking() {
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [loading, setLoading] = useState(true);
	const [meetingId, setMeetingId] = useState(true);

	const getMeetingAndToken = async () => {
		const meetingId = await createMeeting({ token: authToken });
		setMeetingId(meetingId);
		setLoading(false);
	};

	const handleButtonClick = async (language) => {
		setSelectedLanguage(language);
		await getMeetingAndToken();
	};

	return (
		<div className='flex flex-col gap-4 px-20 py-10 items-center'>
			{selectedLanguage ? null : (
				<>
					<p className='text-xl'>What language do you want to learn?</p>
					<ul className='menu bg-base-200 w-56 rounded-box'>
						<button className='btn' onClick={() => handleButtonClick('French')}>
							French
						</button>
						<button className='btn' onClick={() => handleButtonClick('Spanish')}>
							Spanish
						</button>
					</ul>
				</>
			)}
			{selectedLanguage && <Match language={selectedLanguage} loading={loading} meetingId={meetingId} setMeetingId={setMeetingId}/>}
		</div>
	);
}

export default MatchMaking;
