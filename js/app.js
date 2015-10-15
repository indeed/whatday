
var app = angular.module('whatday', ['whatday.services'])

app.controller('mainCtrl', function ($scope, calendarService) {
    
    $scope.cycleDay = "";
    $scope.nextWeekDay = "";
    $scope.nextDay = "";

    calendarService.getDayEvents(moment().add(0, "days")).then(function (response) {
        var events = calendarService.parseEvents(response);
        $scope.cycleDay = calendarService.getCycleDay(events);
        getNextDay(1);
    });

    function getNextDay(offset) {
        calendarService.getDayEvents(moment().add(offset, "days")).then(function (response) {
            var events = calendarService.parseEvents(response);
            if (calendarService.getCycleDay(events) == "No school") {
                return getNextDay(offset + 1);
            } else {
                $scope.nextWeekDay = moment().add(offset, "days").format("dddd");
                $scope.nextDay = calendarService.getCycleDay(events);
            }
        });
    }
    




});
