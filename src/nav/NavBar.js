import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

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
                <Link className="nav-link navbar__logout" to="" onClick={() => {
                    localStorage.removeItem("app_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </div>
        </nav>

    </div>
    )
}