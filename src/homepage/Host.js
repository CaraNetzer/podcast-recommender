import { useState } from "react"


export const Host = ({ host, setFavoriteHosts, selectedHosts, setSelectedHosts }) => {

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

    let [selected, setSelected] = useState(false)
    const selectHost = (host) => {
        if (selected) {
            setSelected(false)
            let copy = [...selectedHosts]
            const wantedIndex = copy.indexOf(host)
            copy.splice(wantedIndex, 1)
            setSelectedHosts(copy)
        } else {
            setSelected(true)
            setSelectedHosts(selectedHosts => [...selectedHosts, host])
        }
    }

    return <div className="input-group mb-3 hostItem">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <div id="checkboxBox">
                        <input id="checkbox" checked={selected} type="checkbox" onChange={() => selectHost(host)} />
                    </div>
                </div>
            </div>
            <div className="form-control hostText">
                <h4 className="showhost">{host.name}</h4>
                <button className="delete is-medium" onClick={() => handleDelete(host)}>Delete</button>
            </div>
        </div>
}