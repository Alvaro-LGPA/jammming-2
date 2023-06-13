import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import Track from "../Track/Track";

function Playlist({playlistName, handleNameChange, playListTracks, handleRemoveTrack}){
    return(
        <div className="Playlist">
            <input type="text" placeholder="Enter Playlist Name" value={playlistName} onChange={handleNameChange}></input>

            <TrackList 
                playListTracks={playListTracks} 
                handleRemoveTrack={handleRemoveTrack}
                isRemovable={true}
                />

            {/* {playListTracks?.map((track, i) => <Track key={track.id} name={track.name} artist={track.artist} album={track.album} id={track.id} isRemovable={true} handleRemoveTrack={handleRemoveTrack}/>)}
            <button className="Playlist-save">Save Playlist</button> */}
        </div>
    )
}

export default Playlist;