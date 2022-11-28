import { useEffect, useState, useRef } from "react"
import { SideWebCircle } from "./SideWebCircle"

export const RecommendationWeb = ({ access_token }) => {
    const [allHosts, getAllHosts] = useState([])
    const [numOfHosts, setNumOfHosts] = useState(0)
    const [selectedHost, setSelectedHost] = useState("")
    const [recommendedEpisodes, setRecommendedEpisodes] = useState([])


    useEffect(() => {
        fetch('http://localhost:8088/favoriteHosts')
            .then(response => response.json())
            .then(hosts => {
                getAllHosts(hosts)
                setNumOfHosts(hosts.length)
            })
    }, [])
    

    let firstPageLoad = useRef(true)

    useEffect(() => {
        if (firstPageLoad.current) {
            firstPageLoad.current = false
        } else {
            getRecommendedEpisodes(selectedHost)
            firstPageLoad.current = false
        }
    }, [selectedHost])


    let recommended = []
    const getRecommendedEpisodes = (hostToSelect) => {
        for (const host of allHosts) {
            const searchQuery = `${hostToSelect.name} and ${host.name}`
            console.log(searchQuery)

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
                    recommended.push({
                        host: host.name,
                        episodes: data.episodes?.items,
                        searchQ: searchQuery
                    })
                    setRecommendedEpisodes(recommended)
                    
                }).then(() => splitHosts(selectedHost))
                //this was the problem with loading the episodes -- it wasn't waiting until recommended episodes was done 
                //before splitting the hosts, I had it in a useEffect for when recommended episodes changed, but I needed it to be
                //in a promise here instead
        }
    }


    const [leftHosts, setLeftHosts] = useState([])
    const [rightHosts, setRightHosts] = useState([])

    const splitHosts = (host) => {
        const copy = [...allHosts]
        const i = copy.indexOf(host)
        copy.splice(i, 1)
        if (numOfHosts % 2 === 0) {
            setLeftHosts(copy.slice(0, (numOfHosts / 2)))
            setRightHosts(copy.slice((numOfHosts / 2), numOfHosts - 1))
        } else {
            setLeftHosts(copy.slice(0, Math.floor(numOfHosts / 2)))
            setRightHosts(copy.slice(Math.floor(numOfHosts / 2), numOfHosts + 1))
        }
    }

    return <>
        <nav className="navbar navbar-light">
            {allHosts?.map(host =>
                <p key={host.id} className="my-nav-link" onClick={(e) => {
                    e.preventDefault()
                    setSelectedHost(host)
                }}>{host.name}</p>
            )}
        </nav>
        <div className="web">
            <div className="left-side">
                {selectedHost != "" && leftHosts != []
                    ? leftHosts.map(host => <SideWebCircle key={host.id} host={host} selectedHost={selectedHost} recommendedEpisodes={recommendedEpisodes} />)
                    : ""
                }
            </div>
            <div className="middleCircle">
                {selectedHost != "" 
                    ? <div id="middleWebCircle">
                        <h3 id="selected-host-name">{selectedHost?.name}</h3>
                    </div>
                    : ""
                }
            </div>
            <div className="right-side">
                {selectedHost != "" && rightHosts.length  != []
                    ? rightHosts.map(host => <SideWebCircle key={host.id} host={host} selectedHost={selectedHost} recommendedEpisodes={recommendedEpisodes} />)
                    : ""
                }
            </div>
        </div>
        {selectedHost === ""
            ? <h3 className="pre-text">Select a host above</h3>
            : ""
        }
    </>
}