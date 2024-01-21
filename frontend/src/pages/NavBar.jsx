import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaWandMagicSparkles } from 'react-icons/fa6';

function NavBar() {
	return (
		<>
			<div className='navbar px-20 bg-base-100'>
				<div className='flex-1'>
					<NavLink to='/' className='btn btn-ghost text-2xl'>
						LanguageLearner
					</NavLink>
				</div>
				<div className='flex-none'>
					<ul className='menu menu-horizontal px-1 '>
						<li>
							<NavLink to='/matchmaking'>
								<FaWandMagicSparkles />
								Matchmaking
							</NavLink>
						</li>
						<li>
							<NavLink to='/chats'>Chats</NavLink>
						</li>
					</ul>
					<li className='dropdown dropdown-end'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full'>
								<img
									alt='Tailwind CSS Navbar component'
									src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a className='justify-between'>
									Profile
									<span className='badge'>New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</li>
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default NavBar;
