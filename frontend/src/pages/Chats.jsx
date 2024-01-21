import React from 'react';
const myName = 'Anakin';

function Chats() {
	const messages = [
		{
			name: 'Obi-Wan Kenobi',
			message: 'You were the Chosen One!',
			time: '12:45',
			status: 'Delivered',
		},
		{
			name: 'Anakin',
			message: 'I hate you!',
			time: '12:46',
			status: 'Seen at 12:46',
		},
	];

	return (
		<div className='drawer lg:drawer-open'>
			<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col items-between justify-end p-10'>
				<label
					htmlFor='my-drawer-2'
					className='btn btn-primary drawer-button lg:hidden'
				>
					Open drawer
				</label>
				{messages.map((message) => (
					<Message message={message} />
				))}
				<input
					type='text'
					placeholder='Type here'
					className='input input-bordered w-full'
				/>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-2'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
					{/* Sidebar content here */}
					<li>
						<a>
							<div className='avatar'>
								<div className='w-10 rounded-full'>
									<img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
								</div>
							</div>
							John Doe
						</a>
					</li>
					<li>
						<a>
							<div className='avatar'>
								<div className='w-10 rounded-full'>
									<img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
								</div>
							</div>
							Jane Smith
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

function Message({ message }) {
	return (
		<div
			className={`chat ${
				message.name === myName ? 'chat-end' : 'chat-start'
			}`}
		>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img
						alt='Tailwind CSS chat bubble component'
						src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
					/>
				</div>
			</div>
			<div className='chat-header'>
				{message.name}
				<time className='text-xs opacity-50'>{message.time}</time>
			</div>
			<div className='chat-bubble'>{message.message}</div>
			<div className='chat-footer opacity-50'>{message.status}</div>
		</div>
	);
}

export default Chats;
