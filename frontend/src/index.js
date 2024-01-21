import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import Chats from './pages/Chats';
import MatchMaking from './pages/MatchMaking';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VideoCalling from './pages/VideoCalling';

const router = createBrowserRouter([
	{
		path: '/',
		element: <NavBar />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/chats',
				element: <Chats />,
			},
			{
				path: '/matchmaking',
				element: <MatchMaking />,
			},
			{
				path: '/call',
				element: <VideoCalling />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
