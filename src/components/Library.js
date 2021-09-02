import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, setSongs, audioRef, isPlaying,  setIsPlaying, libraryStatus, setLibraryStatus, setPlayIcon }) => {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} song={song} id={song.id} key={song.id} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setPlayIcon={setPlayIcon}/>
				))}
			</div>
		</div>
	);
};

export default Library;
