const request = require('request');

const coordinatesURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const getCoordinates = (place, callback) => {
    request({
        url: coordinatesURL + place + '.json',
        qs: {
            access_token: 'pk.eyJ1Ijoic3VkaXB0YTA4MDgiLCJhIjoiY2s5bzY2YXdvMDMxYjNsbnc1Ym1hYnFxNSJ9.zacRNL8tFOGNY1tocc6zgw',
            limit: 1
        },
        json: true
    }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the geocode service', undefined);
        } else if (body.features.length === 0) {
            callback('Location not found', undefined);
        } else {
            const coordinates = {
                lattitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            };
            callback(undefined, coordinates);
        }
    })
};

module.exports = getCoordinates;