import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, playIcon, setPlayIcon, songs, setSongs}) => {
	//*State
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [firstPlay, setFirstPlay] = useState(true);

	//*Event Handlers

	//? play/pause button handling
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

	//? autoplay on load
	const autoPlayHandler = () => {
		if (firstPlay) {
			setFirstPlay(false);
		} else {
			audioRef.current.play();
			setPlayIcon(faPause);
			setIsPlaying(true);
		}
	};

	//? handling forward/backward skip
	const skipHandler = (direction) => {
		let currentIndex = songs.indexOf(currentSong);
		direction === "forward"
			? setCurrentSong(songs[currentIndex + 1] || songs[0])
			: setCurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]);
	};

	//? handling the start/end times of the song
	const TimeHandler = (e) => {
		const current = e.target.currentTime; //?-- to keep it simple when adding to SongInfo
		const duration = e.target.duration || 0;
		//Calculate percentage
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animation = Math.round(roundedCurrent / roundedDuration * 100);
		console.log(animation);
		setSongInfo({ ...songInfo, currentTime: current, duration: duration, animationPercantage: animation }); //...songInfo is 'keep previous info'
	};

	//? making the time aesthetic
	const getTime = (time) => {
		return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
	};

	//? handling time values while dragging the bar
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value }); //keep info and update current time
	};

	//Add the styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`
	}
	return (
		<div className="player">
			<h1>Player</h1>
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div className="track">
					<input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration}
						value={songInfo.currentTime}
						type="range"
					/>
				<div className="animated-track" style={trackAnim} />
				</div>
				<p>{getTime(songInfo.duration)}</p>

			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipHandler("backward")}
					className="skip-back"
					icon={faAngleLeft}
					size="2x"
				/>
				<FontAwesomeIcon onClick={playSongHandler} className="play" icon={playIcon} size="2x" />
				<FontAwesomeIcon
					onClick={() => skipHandler("forward")}
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
				/>
			</div>
			<div className="volume-bar" />
			<audio
				onLoadedData={autoPlayHandler}
				onLoadedMetadata={TimeHandler}
				onTimeUpdate={TimeHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={() => skipHandler("forward")}
			/>
		</div>
	);
};

//? onLoadedMetadata is like 'load the info when the audio file loads up'

export default Player;
