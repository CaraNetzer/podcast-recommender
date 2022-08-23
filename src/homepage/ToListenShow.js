import "./Homepage.css"

export const ToListenShow = ({ show }) => {

    const handleArchive = (show) => {
        console.log("do nothing for now")
    }

    return <div className="showItem">
        <img src={show.img} alt="show logo thumbnail" className="image item" />
        <div className="textContent">
            <h3 className="showName item">{show.name}</h3>
            <button onClick={handleArchive}>Add To Favorites</button>
            <button onClick={handleArchive}>Archive</button>
        </div>
    </div>
}