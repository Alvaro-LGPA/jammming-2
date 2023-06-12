
import './App.css';
import React from 'react';
import { useState } from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

function App() {

  const tracksInfo = [
    {
      name: "Track 1 Name",
      artist: "Track 1 Artist",
      album: "Track 1 Album",
      id: "Track 1-id"
    },
    {
      name: "Track 2 Name",
      artist: "Track 2 Artist",
      album: "Track 2 Album",
      id: "Track 2-id"
    },
    {
      name: "Track 3 Name",
      artist: "Track 3 Artist",
      album: "Track 3 Album",
      id: "Track 3-id"
    }
  ]

  const playListTracks = [
    {
      name: "Track 4 Name",
      artist: "Track 4 Artist",
      album: "Track 4 Album",
      id: "Track 4-id"
    },
    {
      name: "Track 5 Name",
      artist: "Track 5 Artist",
      album: "Track 5 Album",
      id: "Track 5-id"
    },
    {
      name: "Track 6 Name",
      artist: "Track 6 Artist",
      album: "Track 6 Album",
      id: "Track 6-id"
    }
  ]

  // Display search results
  const [searchResults, setSearchResults] = useState(tracksInfo);

  // Manage playlist
  const [playList, setPlaylist] = useState(playListTracks)

  // Handle playlist name change
  const [playlistName, setPlaylistName] = useState("");

  function handleNameChange(event) {
    setPlaylistName(event.target.value)

  }

  // Add track from searchResults to Playlist
  function handleAddTrack(trackId) {
    const trackToAdd = searchResults.find(track => track.id === trackId);
    
    const canAdd = !playList.some(track => track.id === trackId);
    if (canAdd) {
      setPlaylist([...playList, trackToAdd])
    }
  }


  return (
    <div className="App">
      <SearchBar />
      <div className='App-playlist'>
        <SearchResults
          searchResults={searchResults}
          handleAddTrack={handleAddTrack} />
        <Playlist
          playlistName={playlistName}
          handleNameChange={handleNameChange}
          playListTracks={playList} />
      </div>
    </div>
  );
}

export default App;
