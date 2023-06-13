import "./Track.css"

function Track({name, artist, album, id, handleAddTrack, handleRemoveTrack, isRemovable}) {
    return (
        
        <div className="Track" >
            
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            {isRemovable? <button className="Track-action" onClick={() => handleRemoveTrack(id)}>-</button>:<button className="Track-action" onClick={() => handleAddTrack(id)}>+</button>}
        </div>
    )
}

export default Track;