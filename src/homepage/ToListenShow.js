import "./Homepage.css"

export const ToListenShow = ({ show, setToListen, setFavoriteShows }) => {
    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const handleArchive = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({statusId: 3})
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
            body: JSON.stringify({statusId: 1})
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