import React from "react";
import {faPause} from "@fortawesome/free-solid-svg-icons";

const LibrarySong = ({ song, songs, setSongs, currentSong, setCurrentSong , audioRef, isPlaying, setIsPlaying , setPlayIcon }) => {

	const songSelectHandler = async () => {

		setCurrentSong(song); //literally change the current song
		audioRef.current.play();
		setPlayIcon(faPause);
		setIsPlaying(true);

	};

	//? if song.active is true add the 'selected' className for css
	return (
		<div onClick={songSelectHandler} className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}>
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h2>{song.name}</h2>
				<h3>{song.artist}</h3>
			</div>
		</div>
	);
};

export default LibrarySong;
