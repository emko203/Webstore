const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: [ 'GET', 'POST' ]
	}
});

app.use(cors());

io.on('connection', socket => {
	socket.on('msg', info => {
		io.emit('msg', info);
	});
	console.log('User is connected');
});

http.listen(5000, () => {
	console.log('server is listening');
});
