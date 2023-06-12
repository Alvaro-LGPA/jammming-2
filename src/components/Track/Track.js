import "./Track.css"

function Track({name, artist, album, id}) {
    return (
        <div className="Track" key={id}>
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            <button className="Track-action">+</button>
        </div>
    )
}

export default Track;