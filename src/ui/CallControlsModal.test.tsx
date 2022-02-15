import { prettyDOM, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CallControlsModal from './CallControlsModal'
import { accept } from '../callIntegration'

jest.mock('../callIntegration', () => ({
  accept: jest.fn(),
  reject: jest.fn(),
  mute: jest.fn(),
  hangup: jest.fn(),
  makePhoneCall: jest.fn()
}))

// Demo approaches to finding elements.

describe('Loading the initial page', () => {
  beforeEach(() => {
    render(<CallControlsModal />)
  })

  it('renders a useful header', () => {
    expect(screen.getByText('Make A Call')).toBeTruthy()
  })

  it('will show a make call button', () => {
    expect(screen.getByText('Make Call')).toBeTruthy()
  })
})


// What If i have more than one button on the page? GetByRole Throws when It matches more than 1.

describe('When I click Make Call', () => {
  beforeEach(() => {
    render(<CallControlsModal />)

    userEvent.type(screen.getByLabelText('Number'), '07411110205')

    // expect(screen.getByLabelText('Number')).toHaveTextContent('07411110205')
    expect(screen.getByLabelText('Number')).toHaveValue('07411110205')

    // console.log(prettyDOM(screen.getByLabelText('Number')))
    userEvent.click(screen.getByText('Make Call'))
  })

  it('shows an Accept button', () => {
    screen.getByText('Accept')
  })

  it('shows an Reject button ', () => {
    screen.getByText('Reject')
  })
})

describe('When I click Accept', () => {
  beforeEach(async () => {
    render(<CallControlsModal />)
    await waitFor(() => screen.getByText('Make Call'))
    userEvent.click(screen.getByText('Make Call'))

    await waitFor(() => screen.getByText('Accept'))
    userEvent.click(screen.getByText('Accept'))

  })

  it('the accept functionality is executed.', () => {
    expect(accept).toBeCalledTimes(1)
  })
})

describe('Accept Renders the correct page', () => {
  beforeEach(async () => {
    render(<CallControlsModal />)
    userEvent.click(screen.getByText('Make Call'))

    await waitFor(() => screen.getByText('Accept'))
    userEvent.click(screen.getByText('Accept'))
  })

  it('shows an Mute button.', () => {
    expect(screen.getByText('Mute')).toBeTruthy()
  })

  it('shows an Hangup button.', () => {
    expect(screen.getByText('Hangup')).toBeTruthy()
  })
})


// describe('When I click Reject', () => {
//     beforeEach(() => {
//         render(<CallControlsModal />)
//         userEvent.click(screen.getByText('Make Call'))
//         userEvent.click(screen.getByText('Reject'))
//     })

//     it('the accept functionality is executed.', () => {
//         expect(reject).toBeCalledTimes(1)
//     })
// })