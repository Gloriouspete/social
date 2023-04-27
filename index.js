const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Map();

// Serve static files from the public folder
app.use(express.static(__dirname + '/public'));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle GET requests to the /room1 URL
app.get('/room1', (req, res) => {
  res.sendFile(__dirname + '/public/room1.html');
});

// Handle GET requests to the /room2 URL
app.get('/room2', (req, res) => {
  res.sendFile(__dirname + '/public/room2.html');
});
app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
})

// Create a namespace for the room1 events
const room1Namespace = io.of('/room1');

// Handle connection events in the room1 namespace
room1Namespace.on('connection', (socket) => {
  console.log(`User connected to room1 with ID: ${socket.id}`);

  // Handle join events in the room1 namespace
  socket.on('join', (data) => {
    users.set(socket.id, data);
    console.log(`User ${data} joined room1`);
    socket.join('room1');
    room1Namespace.to('room1').emit('message', `User ${data} joined room1`);
  });

  // Handle message events in the room1 namespace
socket.on('message', (data) => {
    const username = users.get(socket.id);
    console.log(`Message received in room1 from user ${username}: ${data}`);
    const message = { username, text: data };
    room1Namespace.to('room1').emit('message', JSON.stringify(message));
  });
});  

// Create a namespace for the room2 events
const room2Namespace = io.of('/room2');


// Handle connection events in the room1 namespace
room2Namespace.on('connection', (socket) => {
    console.log(`User connected to room2 with ID: ${socket.id}`);
  
    // Handle join events in the room1 namespace
    socket.on('join', (data) => {
      users.set(socket.id, data);
      console.log(`User ${data} joined room2`);
      socket.join('room2');
      room2Namespace.to('room2').emit('message', `User ${data} joined room2`);
    });
  
    // Handle message events in the room1 namespace
  socket.on('message', (data) => {
      const username = users.get(socket.id);
      console.log(`Message received in room2 from user ${username}: ${data}`);
      const message = { username, text: data };
      room2Namespace.to('room2').emit('message', JSON.stringify(message));
    });
  });  

// Start another server server and listen for
const coderoom = io.of('/main');
coderoom.on('connection',(socket) =>{
    console.log('User connected');
    
    socket.on('join',(roomCode) => {
      socket.join(roomCode);
      console.log(`user joined the room with code:${roomCode}`);
      //send a message to the room about someone joining the room
      coderoom.to(roomCode).emit('chat message',"them don join the room");
      console.log('chat message');
    });
    //for messages and all
    socket.on("chat message",(msg,roomCode) =>{
      coderoom.to(roomCode).emit("chat message",msg);
      console.log('reakk');
    });
    
    });
    
    
    //stop
    app.get('/roomCode',(req,res)=>{
      res.sendFile(__dirname + "/public/index.html")
    });

// Start the server and listen for incoming connections
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
