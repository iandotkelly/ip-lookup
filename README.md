# IP Location Lookup Tool

This is my solution to the take home project.

## Design

The application is written in TypeScript and designed to run on node.js 12.

Initially I considered writing a REST API service for the location lookup using
a web-framework like restify or fastify, and then write a small ReactJs front
end to the application to provide the web interface, using Parcel as a bundler.

However the project instructions state that the project should take 4-5
hours to complete and that "an ideal solition limits complexity".  While the 
fastify-react solution may be more extensible in the future, it certainly 
is much more complex.

So I settled on a simple server-side web application using express, with
a single page written in jade/pug.

The application is structured in the following folders:

- geolite (folder containing the GeoLite2-City data)
- public  (folder contaning static public assets, like styles)
- src     (TypeScript source code)
- test    (Jest test files)
- views   (pug/jade templates)

## Running

The app is designed to run from a docker container, using docker-compose as shown below:

```sh
docker-compose up
```

If you want to clone and run locally you do so with the instructions below.  This requires node.js version 12 to be installed.

```sh
git clone git@github.com:iandotkelly/ip-lookup.git
cd ip-lookup
npm install
npm run compile
node build/src/index.js
```

Once the server is running the web application should be accessible on Port 3000, e.g. http://localhost:3000/

## Tests

Automated tests have been written in Jest, and can be run from npm:

```sh
npm run test

 PASS  test/get-handler.test.ts
  ipGetHandler
    ✓ should render the default view (6ms)

 PASS  test/post-handler.test.ts
  ipPostHandler
    ✓ should render a view with results (5ms)
    ✓ should respond with an error page no IP provided
    ✓ should respond with an error page to a bad IP provided
    ✓ should respond with an error page if the database API throws an error (1ms)

 PASS  test/geo-location.test.ts
  GeoLocation class
    ✓ should construct without location data (3ms)
    ✓ should construct with a missing field (2ms)
    ✓ should construct with all fields

 PASS  test/location-finder.test.ts
  LocationFinder
    ✓ should throw if used when uninitialized (5ms)
    ✓ should return some results for a valid IP address (93ms)
```

If you do not have node and npm installed you can exec into the docker
container created by `docker-compose up` and run the tests from within the
container.

```sh
docker exec -it <container-id> /bin/ash
npm run test
```