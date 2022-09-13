class ChatEngine {
    constructor(chatBoxId, userEmail){
       this.chatBox = $(`#${chatBoxId}`);
       this.userEmail = userEmail;
        
    //    io is a global variable that is available as soon as we include cdn file (in front end )for socket io
       this.socket =  io.connect('http://localhost:5000');

       if(this.userEmail){
       this.connectionHandler();
       }
    }
    
    // this will have the to and fro interaction between observer and subscriber(user)
    connectionHandler(){
            //here connect is the event
        this.socket.on('connect', ()=>console.log('connection established using sockets!!'))
    }
}