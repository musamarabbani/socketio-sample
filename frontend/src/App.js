import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
	const [message, setMessage] = useState('');
	const [chat, setChat] = useState([]);

	const sendChat = (e) => {
		e.preventDefault();
		socket.emit('chat', { message: message });
		setMessage('');
	};
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Chatty App</h1>
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
}

export default App;
