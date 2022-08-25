import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Search.css"


export const ShowDetails = () => {
    const { showId } = useParams()
    const [selectedShow, setShow] = useState()
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
    useEffect(
        () => {
            fetch('http://localhost:8088/shows?statusId=2')
                .then(response => response.json())
                .then(shows => {
                    setToListenShows(shows)
                })
        }, [])


    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)

    const token = window.localStorage.getItem("token")

    const navigate = useNavigate()

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
            name: host,
            statusId: 1,
            spotifyShowId: showId,
            showName: selectedShow.name
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
        if (favoriteShows.find(show => show.name === selectedShow?.name) == undefined) {
            return true
        } else {
            return false
        }
    }
    const addToListenButton = () => {
        if (toListenShows.find(show => show.name === selectedShow?.name) == undefined) {
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
                onChange={(e) => {
                    let [change] = [...host]
                    change = e.target.value
                    setHost(change)}
                }
            />
            <button onClick={() => addToFavoriteHosts()}>Add To Favorite Hosts</button>
        </div>
    }

    const DisplayFavoriteHosts = () => {
        const favHostsFromThisShow = favoriteHosts.filter(host => host.showName == selectedShow?.name)
        return favHostsFromThisShow.map(host =>
            <div key={host.id} className="host">⭐{host.name}</div>
        )
    }
    const DisplayToListenEpisodes = () => {
        const toListenEpisodesFromThisShow = toListenShows.filter(show => show.spotifyShowId == selectedShow?.id)
        return toListenEpisodesFromThisShow.map(show =>
            <div key={show.id} className="show">⭐{show.name}</div>
        )
    }

    return <>
        <button onClick={() => navigate("/searchShows")}>Back to Search</button>
        <div className="show" key={selectedShow?.id}>
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
            <p><b>Number of Episodes</b>: {selectedShow?.total_episodes}</p>
            <div className="savedEpisodes">
                {toListenShows.find(show => show.spotifyShowId === selectedShow?.id) != undefined
                    ? <DisplayToListenEpisodes />
                    : ""
                }
            </div>
            <button onClick={() => showDiv()}>Add Hosts</button>
            {showHostFeild ? <HostField /> : null}                                     
            <div className="hosts">
                {favoriteHosts.find(host => host.showName === selectedShow?.name) != undefined
                    ? <DisplayFavoriteHosts />
                    : ""
                }
            </div>
        </div>
    </>
}