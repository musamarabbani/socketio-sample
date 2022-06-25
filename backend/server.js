const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('What is socket', socket);
	console.log('socket is active to be connected!');

	socket.on('chat', (payload) => {
		console.log('payload ==>', payload);
		io.emit('chat', payload);
	});
});

server.listen(5000, () => {
	console.log('app is listening on port 5000');
});
