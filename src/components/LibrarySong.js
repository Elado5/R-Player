import React from "react";
import {faPause} from "@fortawesome/free-solid-svg-icons";

const LibrarySong = ({ song, songs, setSongs, setCurrentSong, id , audioRef, isPlaying, setIsPlaying , setPlayIcon }) => {

	const songSelectHandler = async () => {

		setCurrentSong(song); //literally change the current song
		audioRef.current.play();
		setPlayIcon(faPause);
		setIsPlaying(true);
		

		setSongs(
			songs.map((targetSong) => {
				return {
					...targetSong,
					active: targetSong.id === song.id,
					//? 'targetSong.id === song.id' is a statement that gives true/false. 
					//? it loops through all songs and changes the 'active' value to true if it's the current one, else it changes to false.
				};
			})
		);
	};

	//? if song.active is true add the 'selected' className for css
	return (
		<div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h2>{song.name}</h2>
				<h3>{song.artist}</h3>
			</div>
		</div>
	);
};

export default LibrarySong;
