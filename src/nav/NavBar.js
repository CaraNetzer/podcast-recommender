import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ access_token, setToken }) => {
    const navigate = useNavigate()

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const CLIENT_ID = "7ff6460da12d4c34b09842ed9289e756"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    return (<div className="wholeNavBar">
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <h2 className="title">Podcast Recommender</h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                    <span className="nav-item nav-link">|</span>
                    <Link className="nav-item nav-link" to="/searchShows">Search</Link>
                    <span className="nav-item nav-link">|</span>
                    <Link className="nav-item nav-link" to="/recommendations">Recommendations</Link>
                    <span className="nav-item nav-link">|</span>
                    <Link className="nav-item nav-link" to="/archive">Archive</Link>
                </div>
                <Link className="nav-link nav-item navbar__logout" to="" onClick={() => {
                    localStorage.removeItem("app_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </div>
        </nav>
        <nav className="navbar" id="spotifyNav">
            {
                !access_token
                    ? <a id="spotifyLoginLink" className="nav-link nav-item navbar__logout" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                    : <Link id="spotifyLogoutLink" className="nav-link nav-item navbar__logout" to="" onClick={() => logout()}>Logout of Spotify</Link>
            }
        </nav>

    </div>
    )
}