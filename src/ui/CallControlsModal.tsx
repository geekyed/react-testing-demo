import { useState } from 'react'

import AlertingCall from './AlertingCall'
import ConnectedCall from './ConnectedCall'
import { accept, hangup, reject, mute, makePhoneCall } from '../callIntegration'
import MakeCall from './MakeCall'


enum CallState {
  Idle = 'idle',
  Alerting = 'alerting',
  Connected = 'connected'
}

const WebRTCControlsModal = () => {
  const [callState, setCallState] = useState(CallState.Idle)

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

  const makeCall = (phoneNo: string) => {
    makePhoneCall(phoneNo)
    setCallState(CallState.Alerting)
  }

  return (
    <div>

      <br />
      {
        callState === CallState.Alerting ?
          <AlertingCall accept={acceptCall} reject={rejectCall} /> :
          callState === CallState.Connected ?
            <ConnectedCall hangup={hangupCall} mute={mute} /> :
            <MakeCall makeCall={makeCall} />
      }
    </div>
  )
}

export default WebRTCControlsModal