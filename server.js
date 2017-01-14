var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
io.on('connection',function(sock){
    console.log('A user has connected from '+sock.request.connection.remoteAddress);
})
http.listen(8080,function(){
    console.log('listening on *:8080');
});