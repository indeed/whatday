var app = angular.module('whatday.services', []);

//Google API get public calendar
var gapiCalendarGET = "https://www.googleapis.com/calendar/v3/calendars/ocdsb.ca_783e3p4smqg0s5nn1mtu921340@group.calendar.google.com/events?key=AIzaSyB4JbJ8B3jPBr-uwqLkF6p-qD7lzBIadgw";

//OpenWeatherMap get Ottawa current weather
var openWeatherMapGET = "http://api.openweathermap.org/data/2.5/weather?appid=98b37b7c96a6ac5edd049e870239a033"

app.factory('calendarService', function ($http) {
    return {

        //Parses event data to find the school cycle day
        getCycleDay: function (events) {
            for (var event in events) {
                if (events[event].summary && events[event].summary.substring(0, 3) == "Day") {
                    return events[event].summary;
                }
            }
            return "No school"
        },

        //Sends GET request to google calendar to fetch events happening on specific day
        getDayEvents: function (time) {
            return $http.get(gapiCalendarGET, {
                params: {
                    timeMin: time.startOf('day').format(),
                    timeMax: time.endOf('day').format(),
                }
            })
        },

        //Get array of event objects from $http response
        parseEvents: function (data) {
            return angular.fromJson(data).data.items
        }
    }

})

app.factory('weatherService', function($http){
    return {
        //Get current weather
        getCurrentWeather: function(city){
            return $http.get(openWeatherMapGET, {
                params:
                    {
                        q: city
                    }
            })
        },

        //parse temperature
        parseTemp: function(data){
            return angular.fromJson(data).data.main.temp
        }
    }
})
