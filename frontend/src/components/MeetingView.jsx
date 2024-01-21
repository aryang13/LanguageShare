import React, { useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join } = useMeeting();
    const { participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    const { webcamOn, micOn } = useParticipant(props.participantId);
  
    return (
      <div>
        {joined && joined === "JOINED" ? (
            <div className="flex">
                <div className="w-full">
                    <div className="flex justify-center">
                        {[...participants.keys()].map((participantId) => (
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                    <Controls webcamOn={webcamOn} micOn={micOn} />
                </div>
                <div className="text-pretty break-words w-1/5 p-10">
                    <p>Translation:</p>
                    <div>HELLOHELLOHELLOHELLOHELLO HELLOHELLOHELLOHELLOHELLO</div>
                </div>
            </div>
        ) : joined && joined === "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
}

export default MeetingView;
