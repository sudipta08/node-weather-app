const request = require('request');

const weatherURL = 'http://api.weatherstack.com/current?access_key=a7dad73933f31372ae117d502dc1ef4d';

const getWeatherInformation = (longitude, lattitude, callback) => {
    request({
        url: weatherURL,
        json: true,
        qs: {
            query: longitude + ',' + lattitude,
            units: 'm'
        }
    }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the weather service', undefined);
        }else if(body.success === false){
            callback('Place not found', undefined);
        }else{
            callback(undefined, 'Current temperature for ' + body.location.name + ' is ' + body.current.temperature + ' degrees');
        }
    });
};

module.exports = getWeatherInformation;