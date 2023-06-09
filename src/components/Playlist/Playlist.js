import Track from "../Track/Track";

function Playlist(){
    return(
        <>
            <input type="text" placeholder="Playlist name"></input>
            <Track />
            <button name="save"></button>
        </>
    )
}

export default Playlist;