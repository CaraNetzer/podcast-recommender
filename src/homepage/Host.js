export const Host = ({host, setFavoriteHosts}) => {

    const localUser = localStorage.getItem("app_user")
    const userObject = JSON.parse(localUser)
    
    const handleDelete = (host) => {
        fetch(`http://localhost:8088/favoriteHosts/${host.id}`, {
            method: "DELETE"
        })
        .then(() => fetch('http://localhost:8088/favoriteHosts'))
            .then(response => response.json())
            .then(hosts => {
                setFavoriteHosts(hosts)
            })
    }

    return <div className="hostItem">
        <div>
            <h3 className="showhost">{host.name}</h3>
            <button onClick={() => handleDelete(host)}>Delete</button>
        </div>
    </div>
}