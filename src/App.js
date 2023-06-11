
import './App.css';
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

  const [searchResults, setSearchResults] = useState(tracksInfo);

  return (
    <div className="App">
      <SearchBar />
      <div className='App-playlist'>
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
