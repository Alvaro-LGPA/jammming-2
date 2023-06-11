import "./Playlist.css";
import Tracklist from "../TrackList/TrackList.js";

function Playlist(){
    return(
        <div className="Playlist">
            <input type="text" placeholder="Playlist name"></input>
            <Tracklist />
            <button className="Playlist-save">Save Playlist</button>
        </div>
    )
}

export default Playlist;