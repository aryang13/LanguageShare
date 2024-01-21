import React, { useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import io from "socket.io-client";
import { localUuid } from '../secrets';
import { useState } from 'react';
import VideoCalling from './VideoCalling';

function Home() {
	const users = [
		{
			name: 'Allen Nguyen',
			profileImg:
				'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
			bio: 'I love to travel and learn languages',
			languagesSpoken: ['English', 'French'],
			languagesLearned: ['Vietnamese'],
		},
		{
			name: 'Aryan Gandhi',
			profileImg:
				'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
			bio: 'I love to travel and learn languages',
			languagesSpoken: ['Hindi', 'Spanish'],
			languagesLearned: ['French'],
		},
		{
			name: 'Aneesh Bulusu',
			profileImg:
				'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
			bio: 'I love to travel and learn languages',
			languagesSpoken: ['Hindi', 'French'],
			languagesLearned: ['Spanish'],
		},
		{
			name: 'Eric Lee',
			profileImg:
				'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
			bio: 'I love to travel and learn languages',
			languagesSpoken: ['English', 'Spanish'],
			languagesLearned: ['Mandarin'],
		},
	];

	const languageToCountry = {
		English: 'GB',
		French: 'FR',
		Spanish: 'ES',
		Hindi: 'IN',
		Vietnamese: 'VN',
		Mandarin: 'CN',
	};

	function LanguageIcons({ languages }) {
		return (
			<span>
				{languages.map((language) => (
					<ReactCountryFlag
						countryCode={languageToCountry[language]}
						svg
						style={{
							width: '2em',
							height: '2em',
							borderRadius: '10em',
						}}
					/>
				))}
			</span>
		);
	}

	const [joinQuestion, setJoinQuestion] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [showCall , setShowCall] = useState(false);
	const [meetingId, setMeetingId] = useState(null);

	useEffect(() => {
		const socket = io('http://localhost:8080');
		const language = 'French';
		socket.emit('online-user', localUuid, language);

		socket.on('user-connected', (uuid) => {
			console.log('user connected');
		});

		socket.emit('join-room', language, localUuid);

		socket.on('user-connected', (userId) => {
			console.log('user connected');
		});

		socket.on('join question', (joinQuestion) => {
			setJoinQuestion(joinQuestion);
			// [user, meetingID]
			setModalOpen(true);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const Modal = ({ isOpen, children }) => {
		if (!isOpen) return null;

		return (
			<div className='modal'>
				{children}
			</div>
		);
	};

	const handleAcceptCall = (joinQuestion) => {
		console.log(joinQuestion);
		setMeetingId(joinQuestion);
		setShowCall(true);
		setModalOpen(false);
	}

	return (
		showCall ?
			<VideoCalling loading={false} meetingId={meetingId} setMeetingId={setMeetingId} /> 
		:
			<div className='grid grid-cols-3 gap-4 px-20 py-10'>
				{users.map((user) => (
					<div className='card card-side h-36 bg-base-300 justify-center items-center p-2'>
						<img
							src={user.profileImg}
							alt='Shoes'
							className='w-32 h-32 object-cover rounded-lg'
						/>
						<div className='card-body justify-between h-full px-4 py-2'>
							<div className='flex flex-col'>
								<h2 className='card-title'>{user.name}</h2>
								<p className='text-sm'>{user.bio}</p>
							</div>

							<div className='flex font-thin text-sm gap-4'>
								<span>
									speaks{' '}
									<LanguageIcons
										languages={user.languagesSpoken}
									/>
								</span>
								<span>
									learning{' '}
									<LanguageIcons
										languages={user.languagesLearned}
									/>
								</span>
							</div>
						</div>
					</div>
				))}
				{modalOpen && (
					<div className='modal-box'>
						<div className='flex flex-col'>
							<p>You are receiving a call from "Eric".</p>
							<ul className='menu bg-base-200 w-56 rounded-box'>
								<button className='btn btn-green' onClick={() => handleAcceptCall(joinQuestion)}>Accept</button>
								<button className='btn'>Decline</button>
							</ul>
						</div>
					</div>
				)}
			</div>
	);
}

export default Home;

			// <div>
			// 	<p>You are receiving a call from "Eric".</p>
			// 	<ul className='menu bg-base-200 w-56 rounded-box'>
			// 		<button className='btn btn-green'>Accept</button>
			// 		<button className='btn'>Decline</button>
			// 	</ul>
			// </div>