import { useState } from 'react'

interface ConnectedCallProps {
    hangup: () => void,
    mute: (isMuted: boolean) => void
}

const ConnectedCall = ({ hangup, mute } : ConnectedCallProps) => {
    const [ muted, setMuted ] = useState(false)

    const muteCall = () => {
        mute(!muted)
        setMuted(!muted)
    }

    return (
        <div>
            <button onClick={hangup}>Hangup</button>
            <button onClick={muteCall}>{muted ? 'Unmute' : 'Mute'} </button>
        </div>
    )
}

export default ConnectedCall