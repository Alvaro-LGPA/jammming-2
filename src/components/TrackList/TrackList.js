import "./TrackList.css"
import Track from "../Track/Track"

function TrackList({searchResults}) {
    
    return (
        <div className="TrackList">
            {searchResults?.map((track, i) => <Track name={track.name} artist={track.artist} album={track.album} id={track.id} />)}
            {/* {searchResults} */}
        </div>
    )
}

export default TrackList;