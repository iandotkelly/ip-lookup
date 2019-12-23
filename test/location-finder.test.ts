import { LocationFinder } from '../src/location-finder'
import { Option } from 'prelude-ts'

describe('LocationFinder', () => {
  it('should throw if used when uninitialized', () => {
    const finder = new LocationFinder()
    expect(() => {
      finder.find('24.231.178.13')
    }).toThrow()
  })

  it('should return some results for a valid IP address', done => {
    // this isn't an ideal test as these values may change
    // if we could use a fake db to do this it might be better
    const finder = new LocationFinder()
    finder.initialize().then(() => {
      const location = finder.find('24.231.178.13')
      expect(location.latitude).toStrictEqual(Option.some(42.458))
      done()
    })
  })
})
