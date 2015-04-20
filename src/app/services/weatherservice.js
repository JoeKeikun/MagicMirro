'use strict';

/**
 * @ngdoc service
 * @name magicMirro.WeatherService
 * @description
 * # WeatherService
 * Service in the magicMirro.
 */
angular.module('magicMirro')
    .service('WeatherService', function($rootScope, $http) {
        // yahoo weather
        var woeid = 2151849, // 2151849：上海
            serverUrl = 'https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20woeid%3D\'' + woeid + '\'%20AND%20u%3D\'c\'&format=json&diagnostics=true&callback=';

        var publicApi = {
            getWeather: function(callback) {
                var req = {
                    method: 'GET',
                    url: serverUrl
                };

                if (callback) {
                    $http(req).success(callback).error(function() {
                        // 加载数据失败
                        console.error('load weather error!');
                    });
                }
            }
        };


        return publicApi;
    });