import "./Homepage.css"
import { Link } from "react-router-dom"


export const Show = ({ show, setFavoriteShows }) => {

    const handleArchive = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ statusId: 3 })
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=1'))
            .then(response => response.json())
            .then(shows => {
                setFavoriteShows(shows)
            })
    }
    const handleDelete = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "DELETE"
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=1'))
            .then(response => response.json())
            .then(shows => {
                setFavoriteShows(shows)
            })
    }

    return <div className="card">
        <div className="card-image">
            <figure className="image is-1by1">
                <img src={show.img} alt="Placeholder image" />
            </figure>
        </div>
        <div className="card-content">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src={show.img} alt="Placeholder image" />
                    </figure>
                </div>
                <div className="media-content">
                    <Link to={`/showDetails/${show.spotifyShowId}`}><h3 className="showName item">{show.name}</h3></Link>
                    <p className="subtitle">by {show.publisher}</p>
                </div>
            </div>

        </div>
        <footer className="card-footer">
            <button type="button" className="btn btn-outline-info" onClick={() => handleArchive(show)}>Archive</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(show)}>Delete</button>
        </footer>
    </div>


    {/* <div className="showItem">
        <img src={show.img} alt="show logo thumbnail" className="image item" />
        <div className="textContent">
            <Link to={`/showDetails/${show.spotifyShowId}`}><h3 className="showName item">{show.name}</h3></Link>
            <button type="button" className="btn btn-outline-info" onClick={() => handleArchive(show)}>Archive</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(show)}>Delete</button>
        </div>
    </div> */}
}