var app = angular.module('swApp',['ui.bootstrap','ui.router']);

app.factory('Service', function() {
    return {
        API: 'http://swapi.co/api/'
    }
})

app.controller('swCtrl', function($scope,$state,$http) {    
    
});

/* SET STATE PROVIDER */
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: "home.html",
        controller: 'HomeCtrl'
    })
    
    .state('detail', {
        url: '/detail',
        templateUrl: "detail.html",
        controller: 'DetailCtrl'
    })
    
    $urlRouterProvider.otherwise('/home');
});  

/* HOME CONTROLLER */
app.controller('HomeCtrl', function($scope,$state,$http,Service) {
    var getPeople = {
        method: 'GET',
        url: Service.API+'people'
    }
    $http(getPeople)
    .then(function(res) {
        console.log(res.data.results);
    });
});

/* DETAIL CONTROLLER */
app.controller('DetailCtrl', function($scope,$state,$http) {
    
});