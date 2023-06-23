import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import Track from "../Track/Track";


function Playlist({ playlistName, handleNameChange, playListTracks, handleRemoveTrack, handleCreateSpotifyPlaylist }) {
    return (
        <form onSubmit={handleCreateSpotifyPlaylist} className="Playlist">
            <input
                type="text"
                className="Playlist-input"
                placeholder="Enter Playlist Name"
                value={playlistName}
                onChange={handleNameChange}
                required></input>

            <TrackList
                playListTracks={playListTracks}
                handleRemoveTrack={handleRemoveTrack}
                isRemovable={true}
            />

            <input type="submit" className="Playlist-save" value="Save Playlist to Spotify"></input>
        </form>
    )
}

export default Playlist;