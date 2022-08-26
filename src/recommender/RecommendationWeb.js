import { useEffect, useState } from "react"

export const RecommendationWeb = ({ access_token }) => {
    const [allHosts, getAllHosts] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/favoriteHosts')
                .then(response => response.json())
                .then(hosts => {
                    getAllHosts(hosts)
                })
        }, [])

    return <>
        <h3>Select a Host</h3>
        <nav className="navbar navbar-light">
            {allHosts?.map(host =>
                <a class="nav-link" href="#">{host.name}</a>
            )}
        </nav>
    </>
}