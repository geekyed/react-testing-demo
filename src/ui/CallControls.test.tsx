import '@testing-library/jest-dom'


jest.mock('../callIntegration', () => ({
  accept: jest.fn(),
  reject: jest.fn(),
  mute: jest.fn(),
  hangup: jest.fn(),
  makePhoneCall: jest.fn()
}))

test('Loading the initial page renders some things', () => {

})
