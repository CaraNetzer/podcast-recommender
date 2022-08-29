import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../homepage/Homepage.css"
import "./Archive.css"

export const Archive = () => {
    const [archive, setArchive] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/shows?statusId=3')
                .then(response => response.json())
                .then(shows => {
                    setArchive(shows)
                    console.log(archive)
                })
        }, [])

    const handleDelete = (show) => {
        fetch(`http://localhost:8088/shows/${show.id}`, {
            method: "DELETE"
        })
            .then(() => fetch('http://localhost:8088/shows?statusId=3'))
            .then(response => response.json())
            .then(shows => {
                setArchive(shows)
            })
    }

    return <>
        <article className="archive">
            <h2>Archived Shows</h2>
            <article className="archived-shows">

                {archive.map(show => <div key={show.id} className="card">
                    <div className="card-image">
                        <figure className="image is-1by1">
                            <img src={show.img} alt="show logo thumbnail" />
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
                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(show)}>Delete</button>
                    </footer>
                </div>
                )}

            </article>
        </article>
    </>
}