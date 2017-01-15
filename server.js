var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var online=0;
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
io.on('connection',function(sock){
    online++;
    console.log('A user has connected from '+sock.request.connection.remoteAddress+'; users online '+online);
    sock.on('disconnect',function(){
        online--;
        console.log('A user disconnected; users online '+online);
    });
});
http.listen(8080,function(){
    console.log('listening on *:8080');
});