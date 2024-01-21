import React from 'react';
import ReactCountryFlag from 'react-country-flag';

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

	return (
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
		</div>
	);
}

export default Home;
