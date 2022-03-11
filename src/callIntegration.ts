const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const accept = async (): Promise<void> => {
    console.log('Call Accepted')
    await sleep(1000)
}

export const reject = async (): Promise<void> => {
    console.log('Call Rejected')
    await sleep(1000)
}

export const mute = async (isMuted: boolean): Promise<void> => {
    isMuted ? console.log('Call Muted') : console.log('Call  Un-Muted')
    await sleep(1000)
}

export const hangup = async (): Promise<void> => {
    console.log('Call Hung Up')
    await sleep(1000)
}

export const makePhoneCall = (phoneNo: string) => console.log('dialled:', phoneNo)