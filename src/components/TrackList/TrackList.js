import "./TrackList.css"
import Track from "../Track/Track"

function TrackList({ searchResults, handleAddTrack, playListTracks, isRemovable }) {

    return (
        <>
            {isRemovable ?

                <div className="TrackList">
                    {console.log(playListTracks)}
                    {playListTracks.map(track =>
                    
                        <Track
                            name={track.name}
                            artist={track.artist}
                            album={track.album}
                            key={track.id}
                            id={track.id}
                            handleAddTrack={handleAddTrack}
                            isRemovable={true} />)}
                </div>
                :
                <div className="TrackList">
                    {searchResults.map(track =>
                        <Track
                            name={track.name}
                            artist={track.artist}
                            album={track.album}
                            key={track.id}
                            id={track.id}
                            handleAddTrack={handleAddTrack}
                            isRemovable={false} />)}
                </div>}

        </>
    )
}

export default TrackList;