module.exports.chatSockets = function(socketServer){

//   v r passing socketServer to this
let io = require('socket.io')(socketServer, {
    cors: {
        origin : '*'
    }
});
  
// socket is an object with a lot properties of the user which is sending
io.sockets.on('connection', function(socket){
console.log('new connection received', socket.id)
})
}