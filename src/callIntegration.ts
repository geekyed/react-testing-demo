type DtmfDigit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '*' | '#' 

const accept = () => console.log('Call Accepted')
const reject = () => console.log('Call Rejected')
const mute = (isMuted: boolean) => isMuted ? console.log('Call Muted') : console.log('Call  Un-Muted')
const dtmf = (digit: DtmfDigit) => console.log(`Dtmf digit ${digit} pressed`)
const hangup = () => console.log('Call Hung Up')

export { accept, reject, mute, dtmf, hangup }