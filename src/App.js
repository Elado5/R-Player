import React, {useEffect, useState, useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import data from './data';

function App() {

  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef}/>
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
    </div>
  );
}

export default App;
