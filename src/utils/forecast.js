const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0ed99994cbc7d3f0d5e78cad376ff24f&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error)
      callback('Unable to connect to weatherstack service!', undefined);
    else if (body.error)
      callback(
        'Please specify a valid location identifier using the query parameter.',
        undefined
      );
    else
      callback(
        undefined,
        `It is currently ${body.current.temperature} F. It feels like ${body.current.feelslike} F.`
      );
  });
};

module.exports = forecast;
