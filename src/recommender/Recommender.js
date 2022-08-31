import { useEffect, useState } from "react"
import "./Recommender.css"
import { Link, useParams } from "react-router-dom"

export const Recommender = ({ access_token }) => {
    const { hosts } = useParams()
    const [featuredEpisodes, setFeaturedEpisodes] = useState([])


    const searchQuery = hosts.replaceAll("+", " ")
    console.log(searchQuery)
    const searchEpisodesUrl = new URL("https://api.spotify.com/v1/search")
    const searchEpisodeParams = {
        q: searchQuery,
        type: "episode"
    }
    searchEpisodesUrl.search = new URLSearchParams(searchEpisodeParams).toString();
    console.log(searchEpisodesUrl.search)


    useEffect(() => {
        fetch(searchEpisodesUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                setFeaturedEpisodes(data.episodes?.items)
                console.log(featuredEpisodes)
            })
    }, [])



    const renderEpisodes = () => {
        return featuredEpisodes?.map(episode => (
            <div key={episode.id} className="result-number-section">
                <h4 className="result-number">#{featuredEpisodes.indexOf(episode)+1}:</h4>
                <div className="searchResult" key={episode.id}>

                    {episode.images.length ? <img width="10%" src={episode.images[0].url} alt="" /> : <div>No Image</div>}
                    <h4 key={episode.id} className='link'><Link to={`/episodeDetails/${episode.id}`}>{episode.name}</Link></h4>
                </div>
            </div>
        ))
    }

    return <>
        <div className="rec-header">
            <h1>Episodes Featuring: {hosts}</h1>
        </div>
        <div className='rec-results'>
            {renderEpisodes()}
        </div>
    </>


}