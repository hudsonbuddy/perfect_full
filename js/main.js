var app = angular.module('perfect', ['ngSanitize', "com.2fdevs.videogular"]);

//This is the main method of the app
app.run(function($rootScope) {
      $rootScope.name = "Hudson";
});

//This is the controller for the app

app.controller('MyController', function($scope, $sce) {
    $scope.person = {
        name : "Hudson Duan"
    };
    $scope.config = {
        sources: [

            {src: $sce.trustAsResourceUrl("http://www.hudsonduan.com/img/linlin.mp4"), type: "video/mp4"},
            {src: $sce.trustAsResourceUrl("videogular.webm"), type: "video/webm"},
            {src: $sce.trustAsResourceUrl("videogular.ogg"), type: "video/ogg"}
        ],
        theme: {
            url: "/bower_components/videogular-themes-default/videogular.css"
        }
    };
    
});


