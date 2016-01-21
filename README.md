# Weather App Redux

A mashup of the Google Maps API and Open Weather Maps data. The purpose of which is primarily to play with asynchronous Redux action creators.

## First things first.

You'll need to have a recent version of Node (ideally 5+) and npm (3+) installed.

From the command line, run `npm install` in the repository directory.

While that is running, hop on over to [http://openweathermap.org/appid](http://openweathermap.org/appid) to get your API key. You will need to save this to the `.env` file in the base of this repository like so:

```
OWM_APP_ID=<your_open_weather_map_api_key>
```

Once npm has finished installing, run `npm start` and you should be good to go.
