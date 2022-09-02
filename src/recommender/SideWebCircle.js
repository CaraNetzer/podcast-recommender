export const SideWebCircle = ( {host, recommendedEpisodes, selectedHost}) => {

    const findURL = (host, index) => {
        return recommendedEpisodes.find(object => object.host === host.name)?.episodes[index]?.id
    }
    const findTitle = (host, index) => {
        return recommendedEpisodes.find(object => object.host === host.name)?.episodes[index]?.name
    }
    const findImg = (host, index) => {
        return recommendedEpisodes.find(object => object.host === host.name)?.episodes[index]?.images[0]?.url
    }

    return <>
        <div key={host.id} className="sideWebCircle">
                        <h3 className="other-host-name">{host.name}</h3>
                        <div className="web-results">
                            <h5 className="rec-heading">Recommended Episodes for: {host.name} and {selectedHost.name}</h5>
                            <div className="rec-episodes">
                                <a href={`https://open.spotify.com/episode/${findURL(host,0)}`}
                                    className="rec-episode"
                                    title={`Episode: ${findTitle(host,0)}`}
                                    target="_blank">
                                    <img src={`${findImg(host,0)}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${findURL(host,1)}`}
                                    className="rec-episode"
                                    title={`Episode: ${findTitle(host,1)}`}
                                    target="_blank">
                                    <img src={`${findImg(host,1)}`} alt="#" />
                                </a>
                                <a href={`https://open.spotify.com/episode/${findURL(host,2)}`}
                                    className="rec-episode"
                                    title={`Episode: ${findTitle(host,2)}`}
                                    target="_blank">
                                    <img src={`${findImg(host,2)}`} alt="#" />
                                </a>
                            </div>
                        </div>
                    </div>
    </>
}