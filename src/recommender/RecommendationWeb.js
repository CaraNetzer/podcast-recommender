import { useEffect, useState, useRef } from "react"

export const RecommendationWeb = ({ access_token }) => {
    const [allHosts, getAllHosts] = useState([])
    const [numOfHosts, setNumOfHosts] = useState(0)
    const [selectedHost, setSelectedHost] = useState("")
    const [recommendedEpisodes, setRecommendedEpisodes] = useState([])

    let firstPageLoad = useRef(true)
    //console.log(firstPageLoad)

    useEffect(
        () => {
            //console.log("im here")
            if (firstPageLoad.current) {
                firstPageLoad.current = false
            } else {
                getRecommendedEpisodes(selectedHost)
                //selectHost(selectedHost)
                firstPageLoad.current = false
            }
        }, [selectedHost])

    useEffect(
        () => {
            console.log("refresh the page when recommended episodes changes")
            console.log(selectedHost.name)
            const copy = [...recommendedEpisodes]
            console.log(recommendedEpisodes)
            console.log(copy)
            console.log(copy.length)
            console.log(copy.find(object => object.host === `${selectedHost.name}`))
            console.log(copy.find(object => object.host === "Sarah Marshall"))
            selectHost(selectedHost)

        },
        [recommendedEpisodes])

    let recommended = []
    const getRecommendedEpisodes = (hostToSelect) => {


        for (const host of allHosts) {
            const searchQuery = `${hostToSelect.name} and ${host.name}`
            //console.log(searchQuery)

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
                    console.log(recommended)
                    const copy = [...recommended]
                    console.log(copy)
                    console.log(recommendedEpisodes)
                })
        }
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

    useEffect(() => {
        console.log("is the page reloading?")
        console.log(recommendedEpisodes)
        const copy = [...recommendedEpisodes]
        console.log(copy)
        console.log(copy.length)
        console.log(copy.find(object => object.host === `${selectedHost.name}`))
        console.log(copy.find(object => object.host === "Sarah Marshall"))
    }, [leftHosts, rightHosts])


    /* const fillWeb = (hostToSelect) => {
        LeftHTML = leftHosts.map(host => `<div class="sideWebCircle">
            <h3 class="other-host-name">${host.name}</h3>
            <div class="web-results">
                <h5 class="rec-heading">Recommended Episodes for: ${host.name} and ${hostToSelect.name}</h5>
                <div class="rec-episodes">
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].images[0].url}" alt="#" />
                    </a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].images[0].url}" alt="#" />
                    </a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].images[0].url}" alt="#" />
                    </a>
                </div>    
                </div>
        </div>`)

        RightHTML = rightHosts.map(host => `<div class="sideWebCircle">
            <h3 class="other-host-name">${host.name}</h3>
            <div class="web-results">
                <h5 class="rec-heading">Recommended Episodes for: ${host.name} and ${selectedHost.name}</h5>
                <div class="rec-episodes">
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].images[0].url}" alt="#" />
                    </a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].images[0].url}" alt="#" />
                    </a>
                    <a href="https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}" 
                        class="rec-episode" 
                        title="Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].name}" 
                        target="_blank">
                        <img src="${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].images[0].url}" alt="#" />
                    </a>
                </div> 
            </div>
        </div>`)

        MiddleCircleHTML = `<div id="middleWebCircle">
                <h3 id="selected-host-name">${selectedHost?.name}</h3>
            </div>`
        
        document.querySelector(".left-side").innerHTML = leftHTML.join("")
        document.querySelector(".right-side").innerHTML = rightHTML.join("")
    } */

    const selectHost = (hostToSelect) => {
        splitHosts(hostToSelect)
        //fillWeb(selectedHost)
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
                {selectedHost != ""
                    ? leftHosts.map(host => <div key={host.id} className="sideWebCircle">
                        <h3 className="other-host-name">{host.name}</h3>
                        <div className="web-results">
                            <h5 className="rec-heading">Recommended Episodes for: {host.name} and {selectedHost.name}</h5>
                            <div className="rec-episodes">
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0]?.images[0].url}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1]?.images[0].url}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2]?.images[0].url}`} alt="#" />
                                </a>
                            </div>
                        </div>
                    </div>)
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
                {selectedHost != ""
                    ? rightHosts.map(host => <div key={host.id} className="sideWebCircle">
                        <h3 className="other-host-name">{host.name}</h3>
                        <div className="web-results">
                            <h5 className="rec-heading">Recommended Episodes for: {host.name} and {selectedHost.name}</h5>
                            <div className="rec-episodes">
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0]?.name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[0]?.images[0].url}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1].name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[1]?.images[0].url}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].id}`}
                                    className="rec-episode"
                                    title={`Episode: ${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2].name}`}
                                    target="_blank">
                                    <img src={`${recommendedEpisodes.find(object => object.host === host.name)?.episodes[2]?.images[0].url}`} alt="#" />
                                </a>
                            </div>
                        </div>
                    </div>)
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