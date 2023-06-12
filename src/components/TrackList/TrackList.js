import "./TrackList.css"
import Track from "../Track/Track"

function TrackList({ searchResults, handleAddTrack }) {

    return (
        <div className="TrackList">
            {searchResults?.map((track, i) =>
                <Track
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                    id={track.id}
                    handleAddTrack={handleAddTrack} />)}

        </div>
    )
}

export default TrackList;