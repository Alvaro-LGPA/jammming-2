import "./Playlist.css";
import Track from "../Track/Track";
import Tracklist from "../TrackList/TrackList";
function Playlist({playlistName, handleNameChange, playListTracks}){
    return(
        <div className="Playlist">
            <input type="text" placeholder="Enter Playlist Name" value={playlistName} onChange={handleNameChange}></input>


            {playListTracks?.map((track, i) => <Track name={track.name} artist={track.artist} album={track.album} id={track.id} />)}
            <button className="Playlist-save">Save Playlist</button>
        </div>
    )
}

export default Playlist;