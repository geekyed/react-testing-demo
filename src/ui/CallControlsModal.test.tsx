import { prettyDOM, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CallControlsModal from './CallControlsModal'
import { accept, reject } from '../callIntegration'

jest.mock('../callIntegration', () => ({
  accept: jest.fn(),
  reject: jest.fn(),
  mute: jest.fn(),
  hangup: jest.fn(),
  makePhoneCall: jest.fn()
}))

// Demo approaches to finding elements.

test('Loading the initial page renders a make a call header', () => {
  render(<CallControlsModal />)

  expect(screen.getByText('Make A Call')).toBeTruthy()
})

test('Loading the initial page renders a make call button', () => {
  render(<CallControlsModal />)

  expect(screen.getByText('Make Call')).toBeTruthy()
})

test('When I type a number it appears', () => {
  render(<CallControlsModal />)

  userEvent.type(screen.getByLabelText('Number'), '07411110205')

  // console.log(prettyDOM(screen.getByLabelText('Number')))

  // expect(screen.getByLabelText('Number')).toHaveTextContent('07411110205')
  expect(screen.getByLabelText('Number')).toHaveValue('07411110205')
})

// What If i have more than one button on the page? GetByRole Throws when It matches more than 1.
test('When I click Make Call, Accept and Reject are shown', () => {
  render(<CallControlsModal />)
  userEvent.type(screen.getByLabelText('Number'), '07411110205')

  userEvent.click(screen.getByText('Make Call'))

  screen.getByText('Accept')
  screen.getByText('Reject')
})

test('Clicking accept, accepts the call', async () => {
  render(<CallControlsModal />)
  userEvent.click(screen.getByText('Make Call'))

  await waitFor(() => screen.getByText('Accept'))
  userEvent.click(screen.getByText('Accept'))

  expect(accept).toBeCalledTimes(1)

  await waitFor(() => screen.getByText('Mute'))
  expect(screen.getByText('Mute')).toBeTruthy()
  expect(screen.getByText('Hangup')).toBeTruthy()


})

test('Clicking reject, rejects the call', async () => {
  render(<CallControlsModal />)
  userEvent.click(screen.getByText('Make Call'))

  await waitFor(() => screen.getByText('Reject'))
  userEvent.click(screen.getByText('Reject'))

  expect(reject).toBeCalledTimes(1)

  await waitFor(() => screen.getByText('Make Call'))
  expect(screen.getByText('Number')).toBeTruthy()


})
