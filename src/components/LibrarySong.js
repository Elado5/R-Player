import React from "react";

const LibrarySong = ({ song, songs, setSongs, setCurrentSong, id }) => {
	const songSelectHandler = () => {
		setCurrentSong(song);
	
        setSongs(
            songs.map((targetSong) => {
                return {
                ...targetSong,
                active: targetSong.id === song.id //? after setting the current song, if the targetSong id is equal to it, it's active, else it's false.
                }
            }
            )
        )
        
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
