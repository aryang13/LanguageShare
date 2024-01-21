import { useMeeting } from '@videosdk.live/react-sdk';
import {
	HiOutlineVideoCamera,
	HiOutlineVideoCameraSlash,
} from 'react-icons/hi2';
import { IoMicOutline, IoMicOffSharp } from 'react-icons/io5';
import { PiPhoneX } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

function Controls({ webcamOn, micOn }) {
	console.log(webcamOn, micOn);
	const { leave, toggleMic, toggleWebcam } = useMeeting();
	const navigate = useNavigate();
	
	const onLeave = () => {
		leave();
		navigate("/");
	}

	return (
		<div className='flex w-full justify-center gap-8 pt-2'>
			<button
				onClick={() => toggleWebcam()}
				className='btn btn-circle bg-neutral-300 w-14 h-14'
			>
				{webcamOn ? (
					<HiOutlineVideoCamera size={30} />
				) : (
					<HiOutlineVideoCameraSlash size={30} />
				)}
			</button>
			<button
				onClick={() => toggleMic()}
				className='btn btn-circle bg-neutral-300 w-14 h-14'
			>
				{micOn ? (
					<IoMicOutline size={30} />
				) : (
					<IoMicOffSharp size={30} />
				)}
			</button>
			<button
				onClick={() => onLeave()}
				className='btn btn-circle bg-red-500 w-14 h-14'
			>
				<PiPhoneX size={30} />
			</button>
		</div>
	);
}

export default Controls;
