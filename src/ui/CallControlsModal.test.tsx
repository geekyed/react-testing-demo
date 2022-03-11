// import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
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

test('Loading the initial page renders a make a call header', () => {
  render(<CallControlsModal />)

  expect(screen.getByText('Make A Call')).toBeInTheDocument()
})

test('When I type a number it appears', () => {
  render(<CallControlsModal />)

  userEvent.type(screen.getByLabelText('Number'), '999')

  expect(screen.getByLabelText('Number')).toHaveValue('999')
})

test('When I click make call we have a ringing call.', () => {
  render(<CallControlsModal />)

  userEvent.type(screen.getByLabelText('Number'), '999')
  userEvent.click(screen.getByText('Make Call'))

  const buttonsOnPage = screen.getAllByRole('button')
  expect(buttonsOnPage[0]).toHaveTextContent('Accept')
  expect(buttonsOnPage.find(button => button.textContent === 'Accept'))

  expect(screen.getByText('Accept')).toBeInTheDocument()
  expect(screen.getByText('Reject')).toBeInTheDocument()
})

test('When I click accept we have a active call and accept is called.', async () => {
  render(<CallControlsModal />)

  userEvent.type(screen.getByLabelText('Number'), '999')
  userEvent.click(screen.getByText('Make Call'))


  userEvent.click(screen.getByText('Accept'))
  expect(accept).toBeCalledTimes(1)

  expect(await screen.findByText('Mute')).toBeInTheDocument()
  expect(await screen.findByText('Hangup')).toBeInTheDocument()

  expect(screen.queryByText('Make Call')).not.toBeInTheDocument()
})