import "./Homepage.css"

export const Show = ({ show, setFavoriteShows }) => {

    const handleArchive = (show) => {
        console.log("do nothing for now")
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
            <h3 className="showName item">{show.name}</h3>
            <button onClick={() => handleArchive(show)}>Archive</button>
            <button onClick={() => handleDelete(show)}>Delete</button>
        </div>
    </div>
}