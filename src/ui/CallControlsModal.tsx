import { useState } from 'react'

import AlertingCall from './AlertingCall'
import ConnectedCall from './ConnectedCall'
import { accept, hangup, reject, mute } from '../callIntegration'


enum CallState {
    Idle = 'idle',
    Alerting = 'alerting',
    Connected = 'connected'
}

const WebRTCControlsModal = () => {
    const [ callState, setCallState ] = useState(CallState.Idle)

    const acceptCall = () => {
        accept()
        setCallState(CallState.Connected)
    }

    const rejectCall = () => {
        reject()
        setCallState(CallState.Idle)
    }

    const hangupCall = () => {
        hangup()
        setCallState(CallState.Idle)
    }

    return (
        <div>
            <h2>Call Controls</h2>
            {
                callState === CallState.Alerting ?
                    <AlertingCall accept={acceptCall} reject={rejectCall} /> : 
                callState === CallState.Connected ? 
                    <ConnectedCall hangup={hangupCall} mute={mute} /> :
                    <button onClick={() => setCallState(CallState.Alerting)}>Make Call</button>
                }    
        </div>
    )
}

export default WebRTCControlsModal