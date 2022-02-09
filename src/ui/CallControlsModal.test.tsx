import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CallControlsModal from './CallControlsModal'
import { accept, reject, mute, hangup} from '../callIntegration'

jest.mock('../callIntegration', () => ({
    accept: jest.fn(),
    reject: jest.fn(),
    mute: jest.fn(),
    hangup: jest.fn()
}))

describe('Loading the initial page', () => {
    beforeEach(() => {
        render(<CallControlsModal />)
    })

    it('renders a useful header', () => {
        expect(screen.getByText('Call Controls')).toBeTruthy()
    })

    it('will show a make call button', () => {
        expect(screen.getByText('Make Call')).toBeTruthy()
    })
})


describe('When I click Make Call', () => {
    beforeEach(() => {
        render(<CallControlsModal />)
        userEvent.click(screen.getByText('Make Call'))
    })

    it('shows an Accept button', () => {    
        expect(screen.getByText('Accept')).toBeTruthy()
    })

    it('shows an Reject button ', () => {
        expect(screen.getByText('Reject')).toBeTruthy()
    })
})

describe('When I click Accept', () => {
    beforeEach(() => {
        render(<CallControlsModal />)
        userEvent.click(screen.getByText('Make Call'))
        userEvent.click(screen.getByText('Accept'))
    })

    it('the accept functionality is executed.', () => {
        expect(accept).toBeCalledTimes(1)
    })
})

describe('Accept Renders the correct page', () => {
    beforeEach(() => {
        render(<CallControlsModal />)
        userEvent.click(screen.getByText('Make Call'))
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