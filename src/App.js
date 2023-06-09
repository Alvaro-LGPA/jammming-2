
import './App.css';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <div className='App-playlist'>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
