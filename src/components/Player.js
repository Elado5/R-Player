import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, playIcon, setPlayIcon }) => {

	//*Ref
	//*State
	const [ songInfo, setSongInfo ] = useState({
		currentTime: 0,
		duration: 0
	});
	const [ firstPlay, setFirstPlay ] = useState(true);

	//*Event Handlers
	const playSongHandler = () => {
			if (!isPlaying) {
				setPlayIcon(faPause);
				audioRef.current.play();
				setIsPlaying(!isPlaying);
			} else {
				setPlayIcon(faPlay);
				audioRef.current.pause();
				setIsPlaying(!isPlaying);
			}
	};

	const autoPlayHandler = () => {
		if (firstPlay) {
			setFirstPlay(false);
		} else {
			audioRef.current.play();
			setPlayIcon(faPause);
			setIsPlaying(true);
		}
	};

	const TimeHandler = (e) => {
		const current = e.target.currentTime; //?-- to keep it simple when adding to SongInfo
		const duration = e.target.duration || 0;
		setSongInfo({ ...songInfo, currentTime: current, duration: duration }); //...songInfo is 'keep previous info'
	};

	//? making the time aesthetic
	const getTime = (time) => {
		return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value }); //keep info and update current time
	};

	const nextHandler = (e) => {};

	const prevHandler = (e) => {};

	return (
		<div className="player">
			<h1>Player</h1>
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					onChange={dragHandler}
					min={0}
					max={songInfo.duration}
					value={songInfo.currentTime}
					type="range"
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon onClick={prevHandler} className="skip-back" icon={faAngleLeft} size="2x" />
				<FontAwesomeIcon onClick={playSongHandler} className="play" icon={playIcon} size="2x" />
				<FontAwesomeIcon onClick={nextHandler} className="skip-forward" icon={faAngleRight} size="2x" />
			</div>
			<audio
				onLoadedData={autoPlayHandler}
				onLoadedMetadata={TimeHandler}
				onTimeUpdate={TimeHandler}
				ref={audioRef}
				src={currentSong.audio}
				allow="autoplay"
			/>
		</div>
	);
};

//? onLoadedMetadata is like 'load the info when the audio file loads up'

export default Player;
