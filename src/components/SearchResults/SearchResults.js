import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults({searchResults, handleAddTrack}){
    return(
        <div className="SearchResults">
            <h1>Search Results</h1>
            <TrackList 
                searchResults={searchResults} 
                handleAddTrack={handleAddTrack}/>
        </div>
    )
}

export default SearchResults;