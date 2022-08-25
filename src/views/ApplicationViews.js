import { Homepage } from "../homepage/Homepage.js"
import { Recommender } from "../recommender/Recommender.js"
import { Route, Routes, Outlet } from "react-router-dom"
import "../homepage/Homepage.css"
import { SearchShows } from "../searches/SearchShows.js"
import { ShowDetails } from "../searches/ShowDetails.js"
import { EpisodeDetails } from "../searches/EpisodeDetails.js"
import { Archive } from "../archive/Archive.js"


export const ApplicationViews = () => {

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
            <Route path="searchShows" element={<SearchShows />} />
            <Route path="recommender" element={<Recommender />} />
            <Route path="showDetails/:showId" element={<ShowDetails />} />
            <Route path="episodeDetails/:episodeId" element={<EpisodeDetails />} />
            <Route path="archive" element={<Archive />} />
        </Routes>
    </>
}