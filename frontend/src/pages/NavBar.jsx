import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<>
			<div className='flex gap-4'>
				<h1>Navbar</h1>
				<NavLink to='/' className='btn'>
					Home
				</NavLink>
				<NavLink to='/chats' className='btn'>
					Chats
				</NavLink>
			</div>
			<Outlet />
		</>
	);
}

export default NavBar;
