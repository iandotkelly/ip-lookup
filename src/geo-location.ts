import { City, LocationRecord } from '@maxmind/geoip2-node'
import { isEmpty } from 'ramda'
import { Option } from 'prelude-ts'

class GeoLocation {
  // Using a functional programming Option monad here.  I could happily TypeScript optional
  // properties and test for whether it has a value in the code, I think this is a little cleaner
  latitude: Option<number> = Option.none<number>()
  longitude: Option<number> = Option.none<number>()

  constructor(cityData: City) {
    if (cityData.location && !isEmpty(cityData.location)) {
      const location = cityData.location as LocationRecord
      this.latitude = Option.of(location.latitude)
      this.longitude = Option.of(location.longitude)
    }
  }
}

export { GeoLocation }
