const AlertingCall = ({ accept, reject}) => {
    return (
        <div>
            <button onClick={accept}>Accept</button>
            <button onClick={reject}>Reject</button>
        </div>
    )
}

export default AlertingCall