type AlertingCallProps = {
    accept: () => void,
    reject: () => void
}

const AlertingCall = ({ accept, reject }: AlertingCallProps) => {
    return (
        <div>
            <button onClick={accept}>Accept</button>
            <button onClick={reject}>Reject</button>
        </div>
    )
}

export default AlertingCall