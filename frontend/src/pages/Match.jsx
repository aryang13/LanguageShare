import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const uuid = 'eric';

const Match = ({ language }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const roomId = language;
        const socket = io('http://localhost:8080');

        // Emit an event to start matchmaking and wait for someone to accept the call
        socket.emit('online-user', uuid, language);
        
        socket.on('user-connected', (uuid) => {
            // Handle user connection
        });
        
        // Emit 'join-room' event to join a specific room (language)
        socket.emit('join-room', roomId, uuid);
        
        // Listen for 'user-connected' event in the room to handle when a user joins
        socket.on('user-connected', (userId) => {
            // Handle user joining the room
        });

        // Emit 'request-video-call' event to request a video call
        // generate meetingID when this is mad e. 
        socket.emit('request-video-call', uuid, roomId, meetingID);


        // Listen for 'matched-users' event to handle when matched users are found
        socket.on('matched-users', (matchedUsers) => {
            // Handle matched users
            console.log(matchedUsers);
            setLoading(false);

        });

        return () => {
            socket.disconnect();
        };
    }, [language]);

    return (
        <div>
            {loading ? (
                <div>Matching based on elo...</div>
            ) : (
                <div>Match found! Starting the call...</div>
                // add call component here
            )}
        </div>
    );
};

export default Match;
