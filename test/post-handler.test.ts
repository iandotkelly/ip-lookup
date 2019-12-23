import { createIpPostHandler } from '../src/post-handler'
import { LocationFinder } from '../src/location-finder'
import { GeoLocation } from '../src/geo-location'
import { Option } from 'prelude-ts'

const mockLocation = {
  latitude: Option.of(25),
  longitude: Option.of(-80),
} as GeoLocation

const mockSuccessFinder = ({
  find: () => mockLocation,
} as any) as LocationFinder

const mockThrowingFinder = ({
  find: () => {
    throw new Error('ERROR')
  },
} as any) as LocationFinder

describe('ipPostHandler', () => {
  it('should render a view with results', () => {
    const handler = createIpPostHandler(mockSuccessFinder)
    const req = {
      body: {
        'ip-address': '24.231.178.13',
      },
    }
    const res = {
      render: jest.fn(),
    }
    handler(req, res)
    expect(res.render).toBeCalledWith('index', { location: mockLocation, ip: '24.231.178.13' })
  })

  it('should respond with an error page no IP provided', () => {
    const handler = createIpPostHandler(mockSuccessFinder)
    const req = {
      body: {
        'ip-address': null,
      },
    }
    const res = {
      render: jest.fn(),
    }
    handler(req, res)
    expect(res.render).toBeCalledWith('index', {
      error: 'No IP address provided',
    })
  })

  it('should respond with an error page to a bad IP provided', () => {
    const handler = createIpPostHandler(mockSuccessFinder)
    const req = {
      body: {
        'ip-address': 'hello',
      },
    }
    const res = {
      render: jest.fn(),
    }
    handler(req, res)
    expect(res.render).toBeCalledWith('index', {
      error: 'The address provided is not a valid IPv4 address',
    })
  })

  it('should respond with an error page if the database API throws an error', () => {
    const handler = createIpPostHandler(mockThrowingFinder)
    const req = {
      body: {
        'ip-address': '192.168.1.1',
      },
    }
    const res = {
      render: jest.fn(),
    }
    handler(req, res)
    expect(res.render).toBeCalledWith('index', { error: 'Error: ERROR' })
  })
})
