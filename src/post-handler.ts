import { Address4 } from 'ip-address'
import { LocationFinder } from './location-finder'

// we have to have a function to create this handler as it relies
// on the LocationFinder which is passed into here
function createIpPostHandler(finder: LocationFinder) {
  return function ipPostHandler(req: any, res: any) {
    const ip = req.body['ip-address']
    if (!ip) {
      return res.render('index', { error: 'No IP address provided' })
    }
    if (!new Address4(ip).isValid()) {
      return res.render('index', {
        error: 'The address provided is not a valid IPv4 address',
      })
    }

    try {
      const location = finder.find(ip)
      res.render('index', { location, ip })
    } catch (err) {
      return res.render('index', { error: err.toString() })
    }
  }
}

export { createIpPostHandler }
