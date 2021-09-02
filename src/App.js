import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "./styles/app.scss";
import data from "./data";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function App() {
	//Ref
	const audioRef = useRef(null);
	//State
	const [ songs, setSongs ] = useState(data()); //bring all songs data from data.js
	const [ currentSong, setCurrentSong ] = useState(songs[0]); //the current song that is selected - it opens on the first one as default
	const [ isPlaying, setIsPlaying ] = useState(false); //is the player currently playing a song?
	const [ libraryStatus, setLibraryStatus ] = useState(false); //library open or closed? pass down to Nav and Library
	const [ playIcon, setPlayIcon ] = useState(faPlay); //state of play icon of the player - needed to state lift this one to access it in 'LibrarySong'

	return (
		<div className="App">
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				currentSong={currentSong} setCurrentSong={setCurrentSong}
				isPlaying={isPlaying} setIsPlaying={setIsPlaying}
				audioRef={audioRef}
				playIcon={playIcon} setPlayIcon={setPlayIcon}
        		songs={songs} setSongs={setSongs}
			/>
			<Library
				songs={songs} setSongs={setSongs}
				currentSong={currentSong} setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying} setIsPlaying={setIsPlaying}
				libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}
				setPlayIcon={setPlayIcon}
			/>
		</div>
	);
}

export default App;
