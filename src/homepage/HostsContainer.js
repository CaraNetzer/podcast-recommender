import { useState } from "react"
import { Host } from "./Host"
import { Homepage } from "./Homepage"


export const HostsContainer = () => {
    const [getRecommendationsButton, setGetRecommendationsButton] = useState(false)

    return <>
        <Homepage getRecommendationsButton={getRecommendationsButton}/>
        <Host setGetRecommendationsButton={setGetRecommendationsButton}/>
    </>
}