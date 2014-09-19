var app = angular.module('perfect', ['ngSanitize', "com.2fdevs.videogular", 'ngRoute']);

//This is the main method of the app
app.run(function($rootScope) {
      $rootScope.name = "Hudson";
});

app.config(["$routeProvider", function($routeProvider){

    $routeProvider.otherwise({redirectTo: '/'});


}]);

//This is the controller for the app

app.controller('perfectController', function($scope, $sce, $http, $routeParams) {

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

    $scope.onCompleteVideo = function() {
        $scope.isCompleted = true;

        $scope.currentVideo++;

        if ($scope.currentVideo >= $scope.videos.length) $scope.currentVideo = 0;

        $scope.setVideo($scope.currentVideo);
        console.log('working oncompletevideo');
    };

    $scope.setVideo = function(index) {
        $scope.currentVideo = index;
        $scope.config.sources = $scope.videos[index].sources;
        $scope.API.seekTime(0, false);
        $scope.API.play();
        console.log('working setVideo');
    };

    $scope.toggleSound = function(){

        if($scope.muted == 'true'){
            $scope.API.setVolume(1);
            $scope.muted = 'false';
            $scope.soundState = 'Mute';
        }else if ($scope.muted == 'false'){
            $scope.API.setVolume(0);
            $scope.muted = 'true';
            $scope.soundState = 'Sound';
        }

        console.log('toggling sound');
           
    };
    
    $scope.nextChapter = function(){
        $scope.currentVideo++;
        if ($scope.currentVideo < $scope.videos.length){
            $scope.setVideo($scope.currentVideo);
            console.log('next chapter');
        }else {
            console.log('no more chapters');
        }

    };

    $scope.startOver = function(){

        $scope.setVideo(0);
         console.log('starting over');       

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


