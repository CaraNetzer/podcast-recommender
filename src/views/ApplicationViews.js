import { Homepage } from "../homepage/Homepage.js"
import { SearchHosts } from "../searches/SearchHosts.js"
import { Route, Routes, Outlet } from "react-router-dom"
import "../homepage/Homepage.css"
import { SearchShows } from "../searches/SearchShows.js"
import { ShowDetails } from "../searches/ShowDetails.js"
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
            <Route path="searchHosts" element={<SearchHosts />} />
            <Route path="showDetails/:showId" element={<ShowDetails />} />
            <Route path="archive" element={<Archive />} />
        </Routes>
    </>
}