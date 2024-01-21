import React, { useState } from "react";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { createMeeting } from "../util/video/conferenceHelpers.js";
import { authToken } from "../secrets";
import JoinScreen from "../components/JoinScreen.jsx";
import MeetingView from "../components/MeetingView.jsx";

function getUserInfo(userId) {
    return {
        name: "Aryan Gandhi",
        email: "aryan.gandhi@hotmail.com",
        id: userId
    };
}

function VideoCalling() {
  const [meetingId, setMeetingId] = useState(null);

  const userInfo = getUserInfo("xyz");

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
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
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default VideoCalling;