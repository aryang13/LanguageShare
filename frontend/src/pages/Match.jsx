import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { localUuid } from '../secrets';
import VideoCalling from './VideoCalling';

const uuid = localUuid;

const Match = ({ language, loading, meetingId, setMeetingId }) => {
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
        if (meetingId) {
            socket.emit('request-video-call', uuid, roomId, meetingId);
        }
        
        // Listen for 'matched-users' event to handle when matched users are found
        socket.on('matched-users', (matchedUsers) => {
            // Handle matched users
            console.log(matchedUsers);
        });

        return () => {
            socket.disconnect();
        };
    }, [language, meetingId]);

    return (
        <div>
            <VideoCalling loading={loading} meetingId={meetingId} setMeetingId={setMeetingId}/>
        </div>
    );
};

export default Match;
