import { useMeeting } from "@videosdk.live/react-sdk";
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { IoMicOutline, IoMicOffSharp } from "react-icons/io5";

function Controls({ webcamOn, micOn }) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div className="flex w-full justify-around bottom-0">
        <button onClick={() => leave()}>Leave</button>
        <button className="p-5" onClick={() => toggleMic()}>
            {
              micOn ? <IoMicOutline/> : <IoMicOffSharp />
            }
        </button>
        <button onClick={() => toggleWebcam()}>
            {
              webcamOn ? <HiOutlineVideoCamera/> : <HiOutlineVideoCameraSlash />
            }
        </button>
      </div>
    );
}

export default Controls;