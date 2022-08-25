import "./Homepage.css"
import { Link } from "react-router-dom"


export const Show = ({ show, setFavoriteShows }) => {

    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)
    
    const handleArchive = (show) => {
        const newFavorite = {
            userId: userObject.id,
            name: show.name,
            img: show.img,
            statusId: 3,
            spotifyShowId: show.showId
        }
        fetch('http://localhost:8088/shows', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
            .then(response => response.json()
                .then(() => {
                    fetch(`http://localhost:8088/shows/${show.id}`, {
                        method: "DELETE"
                    })
                }
                ))
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

    return <div className="showItem">
        <img src={show.img} alt="show logo thumbnail" className="image item" />
        <div className="textContent">
            <Link to={`/showDetails/${show.spotifyShowId}`}><h3 className="showName item">{show.name}</h3></Link>
            <button onClick={() => handleArchive(show)}>Archive</button>
            <button onClick={() => handleDelete(show)}>Delete</button>
        </div>
    </div>
}