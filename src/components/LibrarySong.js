import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong, id }) => {

	return (
		<div onClick={ () => setCurrentSong(song) } className="library-song">
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h2>{song.name}</h2>
				<h3>{song.artist}</h3>
			</div>
		</div>
	);
};

export default LibrarySong;
