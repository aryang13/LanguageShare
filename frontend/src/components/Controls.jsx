import { useMeeting } from "@videosdk.live/react-sdk";
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { IoMicOutline, IoMicOffSharp } from "react-icons/io5";
import { PiPhoneX } from "react-icons/pi";

function Controls({ webcamOn, micOn }) {
  console.log(webcamOn, micOn);
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="flex w-full justify-center gap-8 pt-2">
      <button onClick={() => toggleWebcam()}>
        <div className="bg-neutral-300" style={{"padding": "14px", "border-radius": "9999px"}}>
          {
            webcamOn ? <HiOutlineVideoCamera size={30}/> : <HiOutlineVideoCameraSlash size={30}/>
          }
        </div>
      </button>
      <button onClick={() => toggleMic()}>
        <div className="bg-neutral-300" style={{"padding": "14px", "border-radius": "9999px"}}>
          {
            micOn ? <IoMicOutline size={30}/> : <IoMicOffSharp size={30}/>
          }
        </div> 
      </button>
      <button className="rounded-lg" onClick={() => leave()}>
        <div className="bg-red-500" style={{"padding": "14px", "border-radius": "9999px"}}>
          <PiPhoneX size={30}/>
        </div>
      </button>
    </div>
  );
}

export default Controls;