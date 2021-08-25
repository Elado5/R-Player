import React, {useEffect, useState} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import './styles/app.scss';
import data from './data';

function App() {

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong}/>
    </div>
  );
}

export default App;
