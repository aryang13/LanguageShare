import React from 'react';

function MatchMaking() {
	return (
		<div className='flex flex-col gap-4 px-20 py-10 items-center'>
			<p className='text-xl'>What language do you want to learn?</p>
			<ul className='menu bg-base-200 w-56 rounded-box'>
				<button className='btn'>French</button>
				<button className='btn'>Spanish</button>
			</ul>
		</div>
	);
}

export default MatchMaking;
