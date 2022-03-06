const request = require("request");

const forecast = (lat, long, callback, unit = "m") => {
  const url = `http://api.weatherstack.com/current?access_key=e161b9951a546a074b437dbf56247c60&query=${lat},${long}&units=${unit}`;
  request(
    {
      url: url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather services!😓");
      } else if (body.error) {
        callback("Unable to find the weather of the requested location!😣");
      } else {
        callback(undefined, {
          weather: body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          precip: body.current.precip,
          feelslike: body.current.feelslike,
          humidity: body.current.humidity,
          icon: body.current.weather_icons[0],
          isDay: body.current.is_day,
        });
      }
    }
  );
};

module.exports = {
  forecast: forecast,
};
