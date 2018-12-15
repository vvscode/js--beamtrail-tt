# Booking phones

_You could find original task in `./docs` directory_

Demo: https://beamtrail-tt.herokuapp.com/

## Run:

1. clone
1. install dependencies with `npm install`
1. run `npm run dev`

## Db:

Current implementation of Db - just a single json file, which is dumped on every change. Work with db incapsulated to separate class, so it's easy to migrate from existing implementation to any other.

## API

- `/api/phones` - returns list of phones
- `/api/phone/book` - `{ phone, name }` - book phone, if it's possible
- `/api/phone/return` - `{phone, key}` returns phone if it's possible
