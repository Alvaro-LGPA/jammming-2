import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults({searchResults}){
    return(
        <div className="SearchResults">
            <h1>Search Results</h1>
            <TrackList searchResults={searchResults} />
        </div>
    )
}

export default SearchResults;