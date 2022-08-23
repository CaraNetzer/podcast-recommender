export const Host = ({host}) => {
    const handleArchive = (host) => {
        console.log(host)
    }
    const handleDelete = (host) => {
        console.log(host)
    }

    return <div className="hostItem">
        <div>
            <h3 className="showhost">{host.name}</h3>
            <button onClick={() => handleArchive(host)}>Archive</button>
            <button onClick={() => handleDelete(host)}>Delete</button>
        </div>
    </div>
}