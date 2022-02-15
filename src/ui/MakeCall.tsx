import { useState } from "react"

type MakeCallProps = {
  makeCall: (phoneNo: string) => void
}

const MakeCall = ({ makeCall }: MakeCallProps) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <>
      <h2>Make A Call</h2>
      <label htmlFor='testInput'>Number</label>
      <input
        id='testInput'
        type='text'
        value={phoneNumber}
        onChange={changeEvent => setPhoneNumber(changeEvent.target.value)}
      />
      <button onClick={() => makeCall(phoneNumber)}>Make Call</button>
    </>
  )
}

export default MakeCall