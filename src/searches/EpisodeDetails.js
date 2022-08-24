import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Search.css"


export const EpisodeDetails = () => {
    const { episodeId } = useParams()
    const [selectedEpisode, setEpisode] = useState()
    const [favoriteShows, setFavoriteShows] = useState([])
    const [toListenShows, setToListenShows] = useState([])
    const [host, setHost] = useState("")
    const [favoriteHosts, setFavoriteHosts] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/favoriteHosts')
                .then(response => response.json())
                .then(hosts => {
                    setFavoriteHosts(hosts)
                })
        }, [])


    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const token = window.localStorage.getItem("token")

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const singleShow = data
                    setEpisode(singleShow)
                })
        }, [episodeId]
    )

    const addToFavorites = () => {
        const newFavorite = {
            userId: userObject.id,
            name: selectedEpisode.name,
            img: selectedEpisode.images[0].url,
            statusId: 1,
            spotifyShowId: episodeId
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
            name: selectedEpisode.name,
            img: selectedEpisode.images[0].url,
            statusId: 2,
            spotifyShowId: episodeId
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
            name: host,
            statusId: 1,
            spotifyShowId: episodeId,
            showName: selectedEpisode.name
        }
        fetch('http://localhost:8088/favoriteHosts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavoriteHost)
        })
            .then(response => response.json())
            .then(setHost(""))
            .then(() => fetch('http://localhost:8088/favoriteHosts'))
            .then(response => response.json())
            .then(hosts => setFavoriteHosts(hosts))
    }

    const addToFavoritesButton = () => {
        if (favoriteShows.find(show => show.name === selectedEpisode?.name) == undefined) {
            return true
        } else {
            return false
        }
    }
    const addToListenButton = () => {
        if (toListenShows.find(show => show.name === selectedEpisode?.name) == undefined) {
            return true
        } else {
            return false
        }
    }

    const [showHostFeild, setShowHostFeild] = useState(false)
    const showDiv = () => showHostFeild ? setShowHostFeild(false) : setShowHostFeild(true)
    const HostField = () => {
        return <div className="host-field">
            <input type="text"
                placeholder="Enter one name at a time"
                value={host}
                onChange={(e) => setHost(e.target.value)}
            />
            <button onClick={() => addToFavoriteHosts()}>Add To Favorite Hosts</button>
        </div>
    }

    const DisplayFavoriteHosts = () => {
        const favHostsFromThisShow = favoriteHosts.filter(host => host.showName == selectedEpisode?.name)
        return favHostsFromThisShow.map(host =>
            <div className="host">⭐{host.name}</div>
        )
    }

    return <>
        <button onClick={() => navigate("/searchShows")}>Back to Search</button>
        <div className="show" key={selectedEpisode?.id}>
            <h1 className='link'>Show Name</h1>
            <h2>Episode Title: {selectedEpisode?.name}</h2>
            {selectedEpisode?.images.length ? <img width="10%" src={selectedEpisode?.images[0].url} alt="" /> : <div>No Image</div>}

            {addToFavoritesButton()
                ? <button onClick={() => addToFavorites()}>Add To Favorites</button>
                : ""
            }
            {addToListenButton()
                ? <button onClick={() => addToListen()}>+ To Listen</button>
                : ""
            }

            <p><b>Episode Description</b>: {selectedEpisode?.description}</p>
            <p><b>Host</b>: {selectedEpisode?.publisher}</p>
            <button onClick={() => showDiv()}>Add Hosts</button>
            {showHostFeild ? <HostField /> : null}
            <div className="hosts">
                {favoriteHosts.find(host => host.showName === selectedEpisode?.name) != undefined
                    ? <DisplayFavoriteHosts />
                    : ""
                }
            </div>
        </div>
    </>
}