var app = angular.module('whatday', ['whatday.services'])

app.controller('mainCtrl', function ($scope, calendarService, weatherService) {
    
    $scope.cycleDay = "";

    $scope.theDay = "";

    $scope.tempDegree = "";

    getNextDay(0);

    function getNextDay(offset) {
        calendarService.getDayEvents(moment().add(offset, "days")).then(function (response) {
            var events = calendarService.parseEvents(response);

            if (calendarService.getCycleDay(events) == "No school") {
                return getNextDay(offset + 1);
            } else {
                var nextWeekDay = moment().add(offset, "days").format("dddd");
                var nextDay = calendarService.getCycleDay(events);
                $scope.cycleDay = nextDay
                if (offset == 0) {
                    $scope.theDay = "Hi, today is a"
                } else {
                    $scope.theDay = nextWeekDay + " will be a"
                }
            }
        });
    }

    //Get the current weather for Ottawa, parse the Temperature, and output it in a read
    weatherService.getCurrentWeather("Ottawa").then(function (response) {
        var temp = weatherService.parseTemp(response)
        temp -= 273.15
        $scope.tempDegree = Math.round(temp)
        console.log(response)
    })

});
