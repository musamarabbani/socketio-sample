import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import './App.css';

const socket = io('http://localhost:5000');
const userId = nanoid(5);
const App = () => {
	const [message, setMessage] = useState('');
	const [chat, setChat] = useState([]);

	useEffect(() => {
		socket.on('chat', (payload) => {
			setChat([...chat, payload]);
		});
	});

	const sendChat = (e) => {
		e.preventDefault();
		socket.emit('chat', { message: message, userId });
		setMessage('');
	};
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Chatty App</h1>
				{chat &&
					chat.map((payload, index) => (
						<p key={index}>
							<span
								style={{
									background: 'green',
									color: '#fff',
									marginRight: '10px',
								}}
							>
								userId: {payload.userId}
							</span>
							{payload.message}
						</p>
					))}
				<form onSubmit={sendChat}>
					<input
						type='text'
						name='chat'
						placeholder='send text'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type='submit'>Send</button>
				</form>
			</header>
		</div>
	);
};

export default App;
