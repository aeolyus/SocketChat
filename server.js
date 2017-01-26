var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var online=0;
var port=process.env.PORT || 8080;
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
io.on('connection',function(sock){
    online++;
    console.log('A user has connected from '+sock.request.connection.remoteAddress+'; users online '+online);
    sock.on('chat message', function(msg){
        io.emit('chat message',msg);
        console.log('message: ' + msg);
    });
    sock.on('disconnect',function(){
        online--;
        console.log('A user disconnected; users online '+online);
    });
});
http.listen(port,function(){
    console.log('listening on *: '+port);
});
