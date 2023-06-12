import "./Track.css"

function Track({name, artist, album, id, handleAddTrack}) {
    return (
        <div className="Track" key={id}>
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            <button className="Track-action" onClick={() => handleAddTrack(id)}>+</button>
        </div>
    )
}

export default Track;