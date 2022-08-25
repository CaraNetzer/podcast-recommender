import { useState } from "react"

export const Host = ({ host, setFavoriteHosts, selectedHosts, setGetRecommendationsButton }) => {

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

    let [selected,setSelected] = useState(false)
    const selectHosts = (host) => {
        if(selected) {
            setSelected(false)
            const wantedIndex = selectedHosts.indexOf(host)
            selectedHosts.splice(wantedIndex,1)
            console.log(selectedHosts)
        } else {
            setSelected(true)
            selectedHosts.push(host)
            console.log(selectedHosts)
        }


        /* fetch(`http://localhost:8088/favoriteHosts/${host.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ selected: true })
        })
            .then(() => fetch('http://localhost:8088/favoriteHosts?selected=true'))
            .then(response => response.json())
            .then(hosts => {
                setSelectedHosts(hosts)
                if (selectedHosts?.length >= 2) {
                    setGetRecommendationsButton(true)
                } 
            }) */
    }

    return <div className="hostItem">
        <h4 className="showhost">{host.name}</h4>
        <input id="checkbox" checked={selected} type="checkbox" onChange={() => selectHosts(host)} />
        <button onClick={() => handleDelete(host)}>Delete</button>
        {selectedHosts.length >= 2 ? setGetRecommendationsButton(true) : null}
    </div>
}