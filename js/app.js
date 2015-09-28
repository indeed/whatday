
var app = angular.module('whatday', ['whatday.services'])

app.controller('mainCtrl', function ($scope, calendarService) {
    
    $scope.cycleDay = "";

    calendarService.getDayEvents(moment()).then(function (response) {
        // Display current day in cycle
        $scope.offset = 0;
        calendarService.getDayEvents(moment().add($scope.offset, "days")).then(function (response) {
            var events = calendarService.parseEvents(response);
            $scope.cycleDay = calendarService.getCycleDay(events);
        });
    });


});
