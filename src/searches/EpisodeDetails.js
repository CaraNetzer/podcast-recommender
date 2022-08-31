import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import "./Search.css"


export const EpisodeDetails = () => {
    const { episodeId } = useParams()
    const [selectedEpisode, setEpisode] = useState()
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
            fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setEpisode(data)
                    console.log(selectedEpisode)
                })
        }, [episodeId]
    )

    const addToListen = () => {
        const newToListen = {
            userId: userObject.id,
            name: selectedEpisode.name,
            img: selectedEpisode.images[0].url,
            statusId: 2,
            spotifyShowId: selectedEpisode.show.id,
            spotifyEpisodeId: selectedEpisode.id,
            publisher: selectedEpisode.show.publisher
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
            showName: selectedEpisode.show.name
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
        return <div className="input-group mb-3 host-field">
            <input type="text" className="form-control"
                value={host}
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
        const favHostsFromThisShow = favoriteHosts.filter(host => host.showName == selectedEpisode?.show?.name)
        return favHostsFromThisShow.map(host =>
            <div key={host?.id} className="host">⭐{host.name}</div>
        )
    }

    return <>
        <button type="button" className="btn btn-link" onClick={() => navigate("/searchShows")}>&lt; Back to Search</button>
        <div className="show" key={selectedEpisode?.id}>
            <div className="show-header">
                {selectedEpisode?.images.length ? <img id="showImage" width="16%" src={selectedEpisode?.images[0].url} alt="" /> : <div>No Image</div>}
                <div className="show-header-text">
                    <h1 className='showTitle'><Link to={`/showDetails/${selectedEpisode?.show.id}`}>{selectedEpisode?.show.name}</Link></h1>
                    <h2>Episode: {selectedEpisode?.name}</h2>
                    {addToListenButton()
                        ? <button className="btn btn-warning" onClick={() => addToListen()}>+ To Listen</button>
                        : ""
                    }
                </div>
            </div>

            <p className="description"><b>Episode Description</b>: {selectedEpisode?.description}</p>
            <div><b>Hosts</b>:</div>
            <div className="hosts">
                {favoriteHosts.find(host => host.showName === selectedEpisode?.show?.name) != undefined
                    ? <DisplayFavoriteHosts />
                    : ""
                }
            </div>
            <button className="btn btn-info" onClick={() => showDiv()}>Add Hosts ▼</button>
            {showHostFeild ? <HostField /> : null}
        </div>
    </>
}