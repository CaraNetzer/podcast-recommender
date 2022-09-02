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
    useEffect(
        () => {
            fetch('http://localhost:8088/shows?statusId=1')
                .then(response => response.json())
                .then(shows => {
                    setFavoriteShows(shows)
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
                .then(response => /* { //attempt to catch the 401 error when you need to relogin to spotify
                    if (response.status != 401) {
                        return response.json()
                    } else {
                        logout()
                        login()
                        //run lines 41-48 again
                        fetch(`https://api.spotify.com/v1/shows/${showId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then(response => */ response.json())
                /* }
            }) */
                .then(data => {
                    const singleShow = data
                    setShow(singleShow)
                    console.log(selectedShow)
                })
        }, [showId]
    )

    const addToFavorites = () => {
        const newFavorite = {
            userId: userObject.id,
            name: selectedShow.name,
            img: selectedShow.images[0].url,
            statusId: 1,
            spotifyShowId: showId,
            publisher: selectedShow.publisher
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
            spotifyShowId: showId,
            publisher: selectedShow.publisher
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
        console.log(selectedShow)
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
        return <div class="input-group mb-3 host-field">
            <input type="text" className="form-control"
                value={host}
                autoFocus
                onChange={(e) => { setHost(e.target.value) }}
                placeholder="Enter one name at a time"
                aria-label="Enter one name at a time"
            />
            <div className="input-group-append">
                <button type="button" className="host-btn btn btn-outline-success" onClick={() => addToFavoriteHosts()}>Add To Favorite Hosts</button>
            </div>
        </div>
    }

    const DisplayFavoriteHosts = () => {
        const favHostsFromThisShow = favoriteHosts.filter(host => host.showName == selectedShow?.name)
        return favHostsFromThisShow.map(host =>
            <p key={host.id} className="host">⭐ {host.name}</p>
        )
    }
    const DisplayToListenEpisodes = () => {
        const toListenEpisodesFromThisShow = toListenShows.filter(show => show.spotifyShowId == selectedShow?.id)
        return toListenEpisodesFromThisShow.map(show =>
            <p key={show.id} className="show"><a href={`/episodeDetails/${show.spotifyEpisodeId}`}>⭐ {show.name}</a></p>
        )
    }

    return <>
        <button type="button" className="btn btn-link" onClick={() => navigate("/searchShows")}>&lt; Back to Search</button>
        <div className="show" key={selectedShow?.id}>
            <div className="show-header">
                {selectedShow?.images?.length ? <img id="showImage" width="16%" src={selectedShow?.images[0].url} alt="" /> : <div>No Image</div>}
                <div className="show-header-text">
                    <h1 className='showTitle'>{selectedShow?.name}</h1>
                    {addToFavoritesButton()
                        ? <button className="btn btn-primary" onClick={() => addToFavorites()}>Add To Favorites</button>
                        : ""
                    }
                    {addToListenButton()
                        ? <button className="btn btn-warning" onClick={() => addToListen()}>+ To Listen</button>
                        : ""
                    }
                    <a target="_blank" href={`${selectedShow?.external_urls?.spotify}`}><button className="btn btn-success">Listen on Spotify</button></a>
                </div>
            </div>
            <p className="description"><b>Description</b>: {selectedShow?.description}</p>
            <p><b>Number of Episodes</b>: {selectedShow?.total_episodes}</p>
            <div className="savedEpisodes">
                {toListenShows.find(show => show.spotifyShowId === selectedShow?.id) != undefined
                    ? <><div><b>Episodes on To Listen list</b>:</div>
                        <DisplayToListenEpisodes />
                    </>
                    : ""
                }
            </div>
            <div><b>Hosts</b>:</div>
            <div className="hosts">
                {favoriteHosts.find(host => host.showName === selectedShow?.name) != undefined
                    ? <DisplayFavoriteHosts />
                    : ""
                }
            </div>
            <button className="btn btn-info" onClick={() => showDiv()}>Add Hosts ▼</button>
            {showHostFeild ? <HostField /> : null}
        </div>
    </>
}