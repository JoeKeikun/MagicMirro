'use strict';

angular.module('magicMirro')
    .controller('MainCtrl', function($scope, $interval, WeatherService) {

        // 时间
        $scope.curDate = +new Date();
        $interval(function() {
            $scope.curDate = +new Date();
        }, 1000);

        // 天气位置
        $scope.weatherPosition = 'Unknow';
        // 天气温度
        $scope.weatherIconCls = 'wi-cloud-refresh';
        // 天气图标
        $scope.weatherTemp = '-';
        // 天气预报
        $scope.weatherForecast = [];


        // 微博
        $scope.wbList = [{
            title: '习近平启程赴巴基斯坦 八架战机护航',
            date: '2015-4-20'
        }, {
            title: '李克强视察银行为督战 狠抓落实“蛮拼的”',
            date: '2015-4-20'
        }, {
            title: '联手安卓ROM 微软欲在中国移动市场分杯羹',
            date: '2015-4-20'
        }, {
            title: '沪指早盘震荡 开市一小时内两市成交量破5000亿元',
            date: '2015-4-20'
        }, {
            title: '上门O2O三条路：业务形态与用户分布是选择关键',
            date: '2015-4-20'
        }, {
            title: '中方回应新西兰被曝替美国监控中国总领事馆',
            date: '2015-4-20'
        }]

        

        // 获取yahoo天气
        WeatherService.getWeather(function(response) {
            var query = response.query,
                channel,
                item,
                conditionT;

            if (query.count === 1) {
                channel = query.results.channel;
                item = channel.item;

                // 天气位置
                $scope.weatherPosition = channel.location.city;

                // 天气温度
                $scope.weatherTemp = item.condition.temp;

                // 天气图标
                conditionT = item.condition.text.toLowerCase();
                if (conditionT.indexOf('cloudy') !== -1) {
                    $scope.weatherIconCls = 'wi-cloudy';
                } else if (conditionT.indexOf('sunny') !== -1) {
                    $scope.weatherIconCls = 'wi-day-sunny';
                } else if (conditionT.indexOf('rain') !== -1) {
                    $scope.weatherIconCls = 'wi-rain';
                }

                // 天气预报
                $scope.weatherForecast = item.forecast;
            }
        });
    });