import React, { useState } from "react";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { createMeeting } from "../util/video/conferenceHelpers.js";
import { authToken } from "../secrets";
import MeetingView from "../components/MeetingView.jsx";
import { useNavigate } from "react-router-dom";

function getUserInfo(userId) {
    return {
        name: "Aryan Gandhi",
        email: "aryan.gandhi@hotmail.com",
        id: userId
    };
}

function VideoCalling(props) {
  const userInfo = getUserInfo("xyz2");
  const { meetingId, setMeetingId } = props;

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return props.loading ? (
    <div>Matching based on elo...</div>
    ) : (
      authToken && props.meetingId && (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: userInfo.name,
            participantId: userInfo.id,
          }}
          token={authToken}
        >
          <MeetingConsumer>
            {() => (
              <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} userInfo={userInfo}/>
            )}
          </MeetingConsumer>
        </MeetingProvider>
      )
    )
}

export default VideoCalling;