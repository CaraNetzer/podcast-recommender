import { useEffect, useState } from "react"

export const RecommendationWeb = ({ access_token }) => {
    const [allHosts, getAllHosts] = useState([])
    const [numOfHosts, setNumOfHosts] = useState(0)
    const [selectedHost, setSelectedHost] = useState("")
    const recommendedEpisodes = []

    for (const host of allHosts) {
        const searchQuery = `${selectedHost.name} and ${host.name}`

        const searchEpisodesUrl = new URL("https://api.spotify.com/v1/search")
        const searchEpisodeParams = {
            q: searchQuery,
            type: "episode"
        }
        searchEpisodesUrl.search = new URLSearchParams(searchEpisodeParams).toString();


        fetch(searchEpisodesUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                recommendedEpisodes.push({
                    host: host.name,
                    episodes: data.episodes?.items
                })
                //console.log(recommendedEpisodes)
            })
    }


useEffect(
    () => {
        fetch('http://localhost:8088/favoriteHosts')
            .then(response => response.json())
            .then(hosts => {
                getAllHosts(hosts)
                setNumOfHosts(hosts.length)
            })
    }, [])

let leftHosts = []
let rightHosts = []

const splitHosts = (host) => {
    const copy = [...allHosts]
    const i = copy.indexOf(host)
    copy.splice(i, 1)
    if (numOfHosts % 2 === 0) {
        leftHosts = copy.slice(0, (numOfHosts / 2))
        console.log(leftHosts)
        rightHosts = copy.slice((numOfHosts / 2), numOfHosts - 1)
        console.log(rightHosts)
    } else {
        leftHosts = copy.slice(0, Math.floor(numOfHosts / 2))
        rightHosts = copy.slice(Math.floor(numOfHosts / 2), numOfHosts + 1)
    }
}

const selectHost = (selectedHost) => {
    setSelectedHost(selectedHost)

    splitHosts(selectedHost)

    const leftHTML = leftHosts.map(host => `<div class="sideWebCircle">
            <h3 class="other-host-name">${host.name}</h3>
            <div class="web-results">
                <h5 class="rec-heading">Recommended Episodes for: ${host.name} and ${selectedHost.name}</h5>
                <div class="rec-episodes">
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].images[0].url}" alt="#" /></a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].images[0].url}" alt="#" /></a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].images[0].url}" alt="#" /></a>
                </div>    
                </div>
        </div>`)

    const rightHTML = rightHosts.map(host => `<div class="sideWebCircle">
            <h3 class="other-host-name">${host.name}</h3>
            <div class="web-results">
                <h5 class="rec-heading">Recommended Episodes for: ${host.name} and ${selectedHost.name}</h5>
                <div class="rec-episodes">
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].images[0].url}" alt="#" /></a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].images[0].url}" alt="#" /></a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}" class="rec-episode" target="_blank"><img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].images[0].url}" alt="#" /></a>
                </div> 
            </div>
        </div>`)

    document.querySelector(".middleCircle").innerHTML = `<div id="middleWebCircle">
                <h3 id="selected-host-name">${selectedHost.name}</h3>
            </div>`
    document.querySelector(".left-side").innerHTML = leftHTML.join("")
    document.querySelector(".right-side").innerHTML = rightHTML.join("")
}

return <>
    <nav className="navbar navbar-light">
        {allHosts?.map(host =>
            <a key={host.id} className="my-nav-link" onClick={(e) => {
                e.preventDefault()
                selectHost(host)
            }} href="#">{host.name}</a>
        )}
    </nav>
    <div className="web">
        <div className="left-side">

        </div>
        <div className="middleCircle">

        </div>
        <div className="right-side">

        </div>
    </div>
    {selectedHost ? ""
        : <h3 className="pre-text">Select a host above</h3>
    }
</>
}