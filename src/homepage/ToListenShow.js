import "./Homepage.css"
import { addToFavorites } from "../apiManager"

export const ToListenShow = ({ show, setFavoriteShows }) => {
    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const handleArchive = (show) => {
        console.log("do nothing for now")
    }
    const handleDelete = (show) => {
        console.log("do nothing for now")
    }

    const addToFavorites = () => {
        const newFavorite = {
            userId: userObject.id,
            name: show.name,
            img: show.img,
            statusId: 1,
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
                if(show.statusId === 2) {
                    fetch(`http://localhost:8088/shows/${show.id}`,{
                        method: "DELETE"
                    })
                }}
            ))
            .then(() => fetch('http://localhost:8088/shows'))
            .then(response => response.json())
            .then(shows => {
                setFavoriteShows(shows)
            })
    }

    return <div className="showItem">
        <img src={show.img} alt="show logo thumbnail" className="image item" />
        <div className="textContent">
            <h3 className="showName item">{show.name}</h3>
            <button onClick={() => addToFavorites()}>Add To Favorites</button>
            <button onClick={() => handleArchive(show)}>Archive</button>
            <button onClick={() => handleDelete(show)}>Delete</button>
        </div>
    </div>
}