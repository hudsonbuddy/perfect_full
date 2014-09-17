var app = angular.module('splash', ['ngSanitize', "com.2fdevs.videogular", 'ngRoute']);

//This is the main method of the app
app.run(function($rootScope) {
      $rootScope.name = "Hudson";
});

//This sets up the routing for the splash page blurb and the FAQ
app.config(["$routeProvider", function($routeProvider){

    $routeProvider.otherwise({redirectTo: '/blurb'});
    $routeProvider.when('/blurb', {
        templateUrl: '/splash/blurb.html'
    });
    $routeProvider.when('/faq', {
        templateUrl: '/splash/faq.html'
    });


}]);

//This is the controller for the app

app.controller('splashController', function($scope, $sce, $http, $location) {

    $scope.person = 'hudson';
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 0;
    $scope.isCompleted = false;
    $scope.API = null;
    $scope.currentVideo = 0;
    $scope.muted = 'true';
    $scope.soundState = 'Sound';

    $scope.onPlayerReady = function(API) {
        $scope.API = API;
        $scope.isCompleted = false;
        $scope.API.setVolume(0);
        console.log('working onplayerready');
    };

    $scope.toggleSound = function(){

        if($scope.muted == 'true'){
            $scope.API.setVolume(1);
            $scope.muted = 'false';
            $scope.soundState = 'Mute'
        }else if ($scope.muted == 'false'){
            $scope.API.setVolume(0);
            $scope.muted = 'true';
            $scope.soundState = 'Sound';
        }

        console.log('toggling sound');
           
    };
    
    $scope.config = {
        theme: {
            url: "/bower_components/videogular-themes-default/videogular.css"
        }
    };

    $scope.videos = [
        {
            sources: [
                {src: $sce.trustAsResourceUrl("http://www.hudsonduan.com/img/linlin.mp4"), type: "video/mp4"},
            ]
        },
        {
            sources: [
                {src: $sce.trustAsResourceUrl("http://www.hudsonduan.com/img/linlin.mp4"), type: "video/mp4"},
            ]
        }
    ];

    $scope.makeRequest = function() {
        $http({
            method: 'JSONP',
            url: 'https://api.github.com/events?callback=JSON_CALLBACK'
            })
        .success(function(data, status, headers, config) {
            $scope.beers = data;
            })
        .error(function(data, status, headers, config) {
            });
    };

});



