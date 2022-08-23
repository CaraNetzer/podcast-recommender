export const Host = ({host}) => {
    const handleArchive = (show) => {
        console.log("do nothing for now")
    }

    return <div className="hostItem">
        <div>
            <h3 className="showhost">{host.name}</h3>
            <button onClick={handleArchive}>Archive</button>
        </div>
    </div>
}