import * as path from 'path'
import { Reader } from '@maxmind/geoip2-node'
import { GeoLocation } from './geo-location'
import { Option } from 'prelude-ts'
import ReaderModel from '@maxmind/geoip2-node/dist/src/readerModel'

const DATABASE_LOCATION = path.join(
  process.env.PWD as string,
  'geolite/GeoLite2-City.mmdb'
)

class LocationFinder {
  reader: Option<ReaderModel> = Option.none<ReaderModel>()

  async initialize() {
    this.reader = Option.of(await Reader.open(DATABASE_LOCATION))
  }

  find(ip: string): GeoLocation {
    const reader = this.reader.getOrThrow(
      new Error('Reader is not initialized')
    )
    return new GeoLocation(reader.city(ip))
  }
}

export { LocationFinder }
