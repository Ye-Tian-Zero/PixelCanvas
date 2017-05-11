var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler(req, res){
	fs.readFile('./socket.html', function(err, data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading html');
		}
		res.writeHead(200);
		res.end(data);
	})
}

io.on('connection', function(socket){
	socket.emit('news', {hello:'world'});
	socket.on('my other event', function(data, fn){
		console.log(data);
		fn("fuck you");
	})
})
