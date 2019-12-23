import { GeoLocation } from '../src/geo-location'
import { City } from '@maxmind/geoip2-node'
import { Option } from 'prelude-ts'

describe('GeoLocation class', () => {
  it('should construct without location data', () => {
    const data = {} as City
    const location = new GeoLocation(data)
    expect(location.latitude).toStrictEqual(Option.none())
    expect(location.longitude).toStrictEqual(Option.none())
  })

  it('should construct with a missing field', () => {
    const data = ({ location: { latitude: 32, longitude: -80 } } as any) as City
    const location = new GeoLocation(data)
    expect(location.latitude).toStrictEqual(Option.some(32))
    expect(location.longitude).toStrictEqual(Option.some(-80))
  })

  it('should construct with all fields', () => {
    const data = ({
      location: { latitude: 32, longitude: -80, accuracyRadius: 20 },
    } as any) as City
    const location = new GeoLocation(data)
    expect(location.latitude).toStrictEqual(Option.some(32))
    expect(location.longitude).toStrictEqual(Option.some(-80))
  })
})
