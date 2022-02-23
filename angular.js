var app = angular.module('app', [])
app.controller("myCtrl", ($scope, $http) => {
    $http.get('http://127.0.0.1:7000/display')
        .success(function(response) {
            $scope.studentinformation = response
        })
    console.log("Data retrieved");
})