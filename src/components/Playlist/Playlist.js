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
            
            <button className="Playlist-save">Save Playlist to Spotify</button> 
        </div>
    )
}

export default Playlist;