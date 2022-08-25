import { useEffect, useState } from "react"
import { Show } from "./Show"
import { ToListenShow } from "./ToListenShow"
import { Host } from "./Host"
import { HostsContainer } from "./HostsContainer"
import { useNavigate } from "react-router-dom"
import "./Homepage.css"
import { Recommender } from "../recommender/Recommender"

export const Homepage = ({ getRecommendationsButton }) => {
    const [favoriteShows, setFavoriteShows] = useState([])
    const [favoriteHosts, setFavoriteHosts] = useState([])
    const [toListen, setToListen] = useState([])
    let selectedHosts = []

    const localUser = localStorage.getItem("app_user")
    const localUserObject = JSON.parse(localUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/shows?statusId=1')
                .then(response => response.json())
                .then(shows => {
                    setFavoriteShows(shows)
                })
        }, [])
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
                    setToListen(shows)
                })
        }, [])


    return <>
        <article className="favoriteShows">
            <h2>Favorite Shows</h2>
            <article className="shows">

                {
                    favoriteShows.map(show => <Show key={`show--${show.id}`} show={show} setFavoriteShows={setFavoriteShows} />)
                }
            </article>
        </article>

        <article className="favoriteHosts">
            <h2>Favorite Hosts</h2>
            <article className="favHostItems">
                {
                    favoriteHosts.map(host => <Host key={`host--${host.id}`} host={host} selectedHosts={selectedHosts} setFavoriteHosts={setFavoriteHosts} favoriteHosts={favoriteHosts} />)
                }
            </article>
            {getRecommendationsButton 
                ? <button onClick={() => console.log("getRecommendations()")}>Get Recommendations</button> 
                : null}
        </article>

        <article className="toListen">
            <h2>To Listen</h2>
            <article className="toListenShows">

                {
                    toListen.map(show => <ToListenShow key={`show--${show.id}`} show={show} setFavoriteShows={setFavoriteShows} setToListen={setToListen}/>)
                }
            </article>
        </article>
    </>
}