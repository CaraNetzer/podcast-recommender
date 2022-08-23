import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const ShowDetails = () => {
    const { showId } = useParams()
    const [selectedShow, setShow] = useState()
    const [favoriteShows, setFavoriteShows] = useState([])
    const [toListenShows, setToListenShows] = useState([])


    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const token = window.localStorage.getItem("token")

    useEffect(
        () => {
            fetch(`https://api.spotify.com/v1/shows/${showId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const singleShow = data
                    setShow(singleShow)
                })
        }, [showId]
    )
    
    const addToFavorites = () => {
        const newFavorite = {
            userId: userObject.id,
            name: selectedShow.name,
            img: selectedShow.images[0].url,
            statusId: 1,
            spotifyShowId: showId
        }
        fetch('http://localhost:8088/shows', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
        .then(() => fetch('http://localhost:8088/shows?statusId=1')
        .then(response => response.json())
        .then(shows => {
            setFavoriteShows(shows)
        }))
        
    }

    const addToListen = () => {
        const newToListen = {
            userId: userObject.id,
            name: selectedShow.name,
            img: selectedShow.images[0].url,
            statusId: 2,
            spotifyShowId: showId
        }
        fetch('http://localhost:8088/shows', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newToListen)
        })
            .then(response => response.json())
            .then(() => fetch('http://localhost:8088/shows?statusId=2')
            .then(response => response.json())
            .then(shows => {
                setToListenShows(shows)
            }))
    }

    const addToFavoriteHosts = () => {
        const newFavoriteHost = {
            userId: userObject.id,
            name: selectedShow.publisher,
            statusId: 1,
            spotifyShowId: showId
        }
        fetch('http://localhost:8088/favoriteHosts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavoriteHost)
        })
            .then(response => response.json())

    }

        console.log(favoriteShows.find(show => show.name === selectedShow?.name))


    const addToFavoritesButton = () => {
        if(favoriteShows.find(show => show.name === selectedShow?.name) == undefined) {
            return true 
        } else {
            return false
        }
    }
    const addToListenButton = () => {
        if(toListenShows.find(show => show.name === selectedShow?.name) == undefined) {
            return true 
        } else {
            return false
        }
    }

    return <div className="show" key={selectedShow?.id}>
        <h1 className='link'>{selectedShow?.name}</h1>
        {selectedShow?.images.length ? <img width="10%" src={selectedShow?.images[0].url} alt="" /> : <div>No Image</div>}
        
        {addToFavoritesButton()
            ? <button onClick={() => addToFavorites()}>Add To Favorites</button>
            : ""
        }
        {addToListenButton()
            ? <button onClick={() => addToListen()}>+ To Listen</button>
            : ""
        }

        <p><b>Description</b>: {selectedShow?.description}</p>
        <p><b>Host</b>: {selectedShow?.publisher}</p>
        <button onClick={() => addToFavoriteHosts()}>Add To Favorite Hosts</button>
    </div>
}