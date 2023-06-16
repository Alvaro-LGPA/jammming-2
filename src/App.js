
import './App.css';
import React from 'react';
import { useState } from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import getData from './util/spotify';

function App() {

  const tracksInfo = [
    {
      name: "Track 1 Name",
      artist: "Track 1 Artist",
      album: "Track 1 Album",
      id: "Track 1-id",
      uri: 12
    },
    {
      name: "Track 2 Name",
      artist: "Track 2 Artist",
      album: "Track 2 Album",
      id: "Track 2-id",
      uri: 123
    },
    {
      name: "Track 3 Name",
      artist: "Track 3 Artist",
      album: "Track 3 Album",
      id: "Track 3-id",
      uri: 1234
    }
  ]


  // handle search term
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTerm(value) {
    setSearchTerm(value)
  }

function sendSearchQuery(){

  const encodedQuery = encodeURIComponent(searchTerm)
  console.log(getData(encodedQuery))

}
  


  // Create an array or uri in the playlist
  const [uris, setUris] = useState([])

  // Display search results
  const [searchResults, setSearchResults] = useState(tracksInfo);

  // Manage playlist
  const [playListTracks, setPlaylist] = useState([])

  // Handle playlist name change
  const [playlistName, setPlaylistName] = useState("");

  function handleNameChange(event) {
    setPlaylistName(event.target.value)

  }

  // Add track from searchResults to Playlist
  function handleAddTrack(trackId) {
    const trackToAdd = searchResults.find(track => track.id === trackId);
    console.log(`TrackId:${trackId}`)
    console.log(`TrackToAdd: ${trackToAdd}`)

    const canAdd = !playListTracks.some(track => track.id === trackId);
    if (canAdd) {
      setPlaylist([...playListTracks, trackToAdd])
      setUris([...uris, trackToAdd.uri])
    }
  }

  // Remove track from playlist
  function handleRemoveTrack(trackId) {
    const trackToRemove = playListTracks.find(track => track.id === trackId);

    const canRemove = playListTracks.some(track => track.id === trackId);

    if (canRemove) {
      setPlaylist(playListTracks.filter(track => track.id !== trackId));
      setUris(uris.filter(uri => uri !== trackToRemove.uri))
    }
  }

  return (
    <div className="App">
      <SearchBar handleSearchTerm={handleSearchTerm} sendSearchQuery={sendSearchQuery}/>
      <div className='App-playlist'>
        <SearchResults
          searchResults={searchResults}
          handleAddTrack={handleAddTrack} />
        <Playlist
          playlistName={playlistName}
          handleNameChange={handleNameChange}
          playListTracks={playListTracks}
          handleRemoveTrack={handleRemoveTrack} />
      </div>
    </div>
  );
}

export default App;
