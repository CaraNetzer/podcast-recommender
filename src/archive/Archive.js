import { useState, useEffect } from "react"
import "../homepage/Homepage.css"

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
            <article className="shows">
                {archive.map(show => 
                    <div className="showItem">
                        <img src={show.img} alt="show logo thumbnail" className="image item" />
                        <div className="textContent">
                            <h3 className="showName item">{show.name}</h3>
                            <button onClick={() => handleDelete(show)}>Delete</button>
                        </div>
                    </div>
                )}
            </article>
        </article>
    </>
}