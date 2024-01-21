import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:8080');


// mock data: 
const uuid = '1234';
const language = 'English';
const roomId = 'English';
const uuid2 = '4321';

// Emit 'online-user' event to notify the server about the user's online status
socket.emit('online-user', uuid, language);

// Listen for 'user-connected' event to handle when a user connects
socket.on('user-connected', (uuid) => {
    // Handle user connection
});

// Emit 'join-room' event to join a specific room (language)
socket.emit('join-room', roomId, uuid);

// Listen for 'user-connected' event in the room to handle when a user joins
socket.on('user-connected', (userId) => {
    // Handle user joining the room
});


// Emit 'online-user' event to notify the server about the user's online status
socket.emit('online-user', uuid2, language);

// Listen for 'user-connected' event to handle when a user connects
socket.on('user-connected', (uuid2) => {
    // Handle user connection
});

// Emit 'join-room' event to join a specific room (language)
socket.emit('join-room', roomId, uuid2);

// Listen for 'user-connected' event in the room to handle when a user joins
socket.on('user-connected', (userId) => {
    // Handle user joining the room
});

// Emit 'request-video-call' event to request a video call
socket.emit('request-video-call', uuid, roomId);

// Listen for 'matched-users' event to handle when matched users are found
socket.on('matched-users', (matchedUsers) => {
    // Handle matched users
    console.log(matchedUsers);
});

// Listen for 'join question' event to handle the join question from the other matched user
socket.on('join question', (joinQuestion) => {
    console.log('join question triggered ' + joinQuestion);
});


// Listen for 'user-disconnected' event to handle when a user disconnects
socket.on('user-disconnected', (disconnectedName) => {
    // Handle user disconnection
    console.log(disconnectedName + ' disconnected');
});

