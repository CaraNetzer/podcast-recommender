import { useEffect, useState } from "react"
import "./Search.css"
import { Link } from "react-router-dom"


export const SearchShows = ({ access_token }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [shows, setShows] = useState([])
    const [sortedEpisodes, setSortedEpisodes] = useState([])

    const sortByDate = (unsortedEpisodes) => {
        const sortComplete = unsortedEpisodes.sort((a, b) => (a?.release_date > b?.release_date) ? -1 : 1)
        return sortComplete
    }


    //axios syntax for reference
    /* const searchArtists = async (e) => {
      e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
              Authorization: `Bearer ${access_token}`
          },
          params: {
              q: searchTerm,
              type: "show"
          }
      })
      console.log(data)
      setShows(data.shows.items)
    } */

    const searchShowsUrl = new URL("https://api.spotify.com/v1/search")
    const searchShowParams = {
        q: searchTerm,
        type: "show"
    }
    searchShowsUrl.search = new URLSearchParams(searchShowParams).toString();

    const searchEpisodesUrl = new URL("https://api.spotify.com/v1/search")
    const searchEpisodeParams = {
        q: searchTerm,
        type: "episode"
    }
    searchEpisodesUrl.search = new URLSearchParams(searchEpisodeParams).toString();

    const searchShows = async (e) => {
        e.preventDefault()
        fetch(searchShowsUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                setShows(data.shows.items.slice(0, 3))
                console.log(shows)
            })
    }
    const searchEpisodes = async (e) => {
        e.preventDefault()
        fetch(searchEpisodesUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                setSortedEpisodes(sortByDate(data.episodes.items.slice(0, 10)))
                console.log(sortedEpisodes)
            })
    }

    const search = (e) => {
        searchEpisodes(e)
        searchShows(e)
    }

    const renderShows = () => {
        return shows.map(show => (
            <div className="searchResult" key={show.id}>
                {show.images.length ? <img width="10%" src={show.images[0].url} alt="" /> : <div>No Image</div>}
                <h4 className='link'><Link to={`/showDetails/${show.id}`}>{show.name}</Link></h4>
            </div>
        ))
    }
    const renderEpisodes = () => {
        return sortedEpisodes.map(episode => (
            <div className="searchResult" key={episode.id}>
                {episode.images.length ? <img width="10%" src={episode.images[0].url} alt="" /> : <div>No Image</div>}
                <div className="searchResultText">
                    <h4 className='link'><Link to={`/episodeDetails/${episode.id}`}>{episode.name}</Link></h4>
                    <p className='link'><b>Release Date</b>: {episode?.release_date}</p>
                </div>
            </div>
        ))
    }

    return (
        <div id="searchMain">

            <div id="searchHeader">

                {access_token
                    ? <form onSubmit={(e) => search(e)}>
                        <input size={40} placeholder="Search for a topic, show, or person" className=" form-control mr-sm-2" type="text" onChange={event => setSearchTerm(event.target.value)} aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 search-btn" type="submit">Search</button>
                    </form>
                    : <h2>Please log in</h2>
                }
            </div>

            <div className='results'>
                <h3>Results: Shows</h3>
                {renderShows()}
            </div>
            <div className='results'>
                <h3>Results: Episodes</h3>
                {renderEpisodes()}
            </div>
        </div >
    )
}