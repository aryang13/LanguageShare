import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import User, { addUserToOnlineList, getOnlineUsers, removeUserFromOnlineList } from './user';
import { matchmake } from './matchmaking';

const app = express();
const PORT = 8080;
const server = createServer(app);
const io = new Server(server);

function onServerListening(): void {
    console.log("Server is Successfully Running, and App is listening on port " + PORT);
}

server.listen(PORT, onServerListening);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket: Socket) => {
    socket.on('online-user', (uuid: string, language: string) => {
        addUserToOnlineList(uuid, language);
        console.log("user connected: " + uuid);
        console.log("online users: " + JSON.stringify(getOnlineUsers()))
        socket.broadcast.emit('user-connected', uuid);

            socket.on('disconnect', () => {
                const disconnectedName = removeUserFromOnlineList(uuid);
                if (disconnectedName) {
                    socket.broadcast.emit('user-disconnected', disconnectedName);
                }
            });
        });

    socket.on('join-room', (roomId: string, uuid: string) => {
        // have roomId's just be languages: 
        console.log("joining room: " + roomId);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', uuid);
        // messages
    });

    socket.on('request-video-call', (uuid: string, roomId: string, meetingID: string) => {
        // roomId is the language
        io.to(roomId).emit('user-requested-video-call', uuid);
        socket.broadcast.emit('user-requested-video-call', uuid);
        console.log("user requested video call: " + uuid);
        const userObjects = getOnlineUsers();
        const matchedUsers = matchmake(uuid, userObjects);
        if (matchedUsers) {
            socket.broadcast.emit('matched-users', matchedUsers);
            const otherMatchedUser = matchedUsers[Object.keys(matchedUsers)[0]];
            const acceptedMeetingId: string = meetingID;
            io.to(roomId).emit('user-requested-video-call', uuid);
            socket.to(roomId).emit('join question', acceptedMeetingId);
            console.log("sent join question to: " + otherMatchedUser.uuid);
        }
    });
});

function getSpecificSocketId(user: User, roomName: string): string | null {
    const socketsInRoom = io.sockets.adapter.rooms.get(roomName);
    console.log('room name: ' + roomName)
    console.log("sockets in room: " + JSON.stringify(socketsInRoom));

    if (socketsInRoom) {
        for (const socketId of socketsInRoom) {
            const socket = io.sockets.sockets.get(socketId);

            // Assuming each socket has a 'userId' property
            if (socket && socket.data.uuid === user.uuid) {
                return socketId;
            }
        }
    }

    return null; // User not found in the room
}


