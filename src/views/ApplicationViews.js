import { Homepage } from "../homepage/Homepage.js"
import { Recommender } from "../recommender/Recommender.js"
import { RecommendationWeb } from "../recommender/RecommendationWeb.js"
import { Route, Routes, Outlet } from "react-router-dom"
import "../homepage/Homepage.css"
import { SearchShows } from "../searches/SearchShows.js"
import { ShowDetails } from "../searches/ShowDetails.js"
import { EpisodeDetails } from "../searches/EpisodeDetails.js"
import { Archive } from "../archive/Archive.js"


export const ApplicationViews = ({ access_token }) => {

    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <div className="main">
                        <Homepage />

                        <Outlet />
                    </div>
                </>
            }>
            </Route>
            <Route path="searchShows" element={<SearchShows access_token={access_token} />} />
            <Route path="recommendations/:hosts" element={<Recommender access_token={access_token}  />} />
            <Route path="recommendations" element={<RecommendationWeb access_token={access_token}  />} />
            <Route path="showDetails/:showId" element={<ShowDetails  />} />
            <Route path="episodeDetails/:episodeId" element={<EpisodeDetails  />} />
            <Route path="archive" element={<Archive />} />
        </Routes>
    </>
}