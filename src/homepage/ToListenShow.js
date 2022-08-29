import "./Homepage.css"
import { Link } from "react-router-dom"

export const ToListenShow = ({ show, setToListen, setFavoriteShows }) => {
    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const handleArchive = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ statusId: 3 })
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=2'))
            .then(response => response.json())
            .then(shows => {
                setToListen(shows)
            })
    }

    const handleDelete = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "DELETE"
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=2'))
            .then(response => response.json())
            .then(shows => {
                setToListen(shows)
            })
    }

    const addToFavorites = () => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ statusId: 1 })
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=2'))
            .then(response => response.json())
            .then(shows => {
                setToListen(shows)
                console.log(shows)
            })
            .then(() => fetch('http://localhost:8088/shows?statusId=1'))
            .then(response => response.json())
            .then(shows => {
                setFavoriteShows(shows)
            })
    }

    return <div className="card">
        <div className="card-image">
            <figure className="image is-5by5">
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
                    <p className="subtitle is-6">by {show.publisher}</p>
                </div>
            </div>

        </div>
        <footer id="card-footer-toListen" className="card-footer">
            <button type="button" className="btn btn-outline-success" onClick={() => addToFavorites()}>Add To Favorites</button>
            <button type="button" className="btn btn-outline-info" onClick={() => handleArchive(show)}>Archive</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(show)}>Delete</button>
        </footer>
    </div>


    {/* <div className="showItem">
        <img src={show.img} alt="show logo thumbnail" className="image item" />
        <div className="textContent">
        <Link to={`/showDetails/${show.spotifyShowId}`}><h3 className="showName item">{show.name}</h3></Link>
            <button onClick={() => addToFavorites()}>Add To Favorites</button>
            <button onClick={() => handleArchive(show)}>Archive</button>
            <button onClick={() => handleDelete(show)}>Delete</button>
        </div>
    </div> */}
}