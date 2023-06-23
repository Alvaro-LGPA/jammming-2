
import './App.css';
import React from 'react';
import { useState } from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/spotify';

function App() {

  // handle search term
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTerm(value) {
    setSearchTerm(value)
  }

function sendSearchQuery(e){
  e.preventDefault();
  const encodedQuery = encodeURIComponent(searchTerm);
  if(encodedQuery) {
    Spotify.search(encodedQuery).then(setSearchResults)}
    else{
      return;
    }

}
  


  // Create an array or uri in the playlist
  const [uris, setUris] = useState([])

  // Display search results
  const [searchResults, setSearchResults] = useState([]);

  // Manage playlist
  const [playListTracks, setPlaylist] = useState([])

  // Handle playlist name change
  const [playlistName, setPlayListName] = useState("");

  function handleNameChange(event) {
    setPlayListName(event.target.value)

  }

  // Add track from searchResults to Playlist
  function handleAddTrack(trackId) {
    const trackToAdd = searchResults.find(track => track.id === trackId);


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

  // Create Spotify user playlist

  function saveSpotifyPlaylist(){
    Spotify.savePlaylist(playlistName, uris);
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
          handleRemoveTrack={handleRemoveTrack} 
          handleCreateSpotifyPlaylist={saveSpotifyPlaylist}/>
      </div>
    </div>
  );
}

export default App;
