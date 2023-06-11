import "./SearchResults.css";
import Tracklist from "../TrackList/TrackList";

function SearchResults(){
    return(
        <div className="SearchResults">
            <h1>Search Results</h1>
            <Tracklist />
        </div>
    )
}

export default SearchResults;