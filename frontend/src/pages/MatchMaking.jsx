import React, { useState } from 'react';
import Match from './Match';

function MatchMaking() {
	const [selectedLanguage, setSelectedLanguage] = useState('');

	const handleButtonClick = (language) => {
		setSelectedLanguage(language);
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
			{selectedLanguage && <Match language={selectedLanguage} />}
		</div>
	);
}

export default MatchMaking;
