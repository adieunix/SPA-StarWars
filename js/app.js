var app = angular.module("swApp", ['ui.bootstrap','ui.router']);

/* API Service */
app.factory('Service', function() {
    return {
        API: 'http://swapi.co/api/'
    }
})

/*  GLOBAL CONTROLLER */
app.controller('swCtrl', function($scope,$state,$http,$rootScope) {    
    $scope.leftVisible = false;
    $scope.rightVisible = false;

    /* Scope for slide menu */
    $scope.close = function() {
        $scope.leftVisible = false;
        $scope.rightVisible = false;
    };
    $scope.showLeft = function(e) {
        $scope.leftVisible = true;
        e.stopPropagation();
    };
    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapePressed", _close);
    function _close() {
        $scope.$apply(function() {
            $scope.close(); 
        });
    }
});

/* SET STATE PROVIDER */
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        cache: false,
        url: '/home',
        templateUrl: "home.html",
        controller: 'HomeCtrl',
        params: {
            id: null,
            url: null
        }
    })
    
    .state('detail', {
        url: '/detail',
        templateUrl: "detail.html",
        controller: 'DetailCtrl'
    })
    
    $urlRouterProvider.otherwise('/home');
});  

/* HOME CONTROLLER */
app.controller('HomeCtrl', function($scope,$state,$http,Service,$stateParams) {
    /* ID for resources
        1. People
        2. Films
        3. Starship
        4. Vehicles
        5. Species
        6. Planets
    */
    
    /* Loading spinner init  */
    $scope.loading = true;
    
    /* Button trigger for Prev/Next */
    $scope.pushPrev = function(url,id) {
        $state.go('home',{id:id,url:url});
    }
    $scope.pushNext = function(url,id) {
        $state.go('home',{id:id,url:url});
    }
    
    /* Condition for People or Not */
    if($stateParams.id==null || $stateParams.id==1) { 
        $scope.title = 'People';
        $scope.id = 1;
        
        if($stateParams.url==null) {

            /* Get People First Page */
            var getPeople = {
                method: 'GET',
                url: Service.API+'people'
            }
            $http(getPeople)
            .then(function(res) {
                $scope.items = res.data.results;
                $scope.loading = false;

                /* Pagination and Conditional */
                $scope.prev = res.data.previous;
                $scope.next = res.data.next;
                
                if(res.data.previous==null) {
                    $scope.page = 1;
                } else {
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                }
            });
        } else {
            /* Get People Next Page */
            var getNextPeople = {
                method: 'GET',
                url: $stateParams.url
            }
            $http(getNextPeople)
            .then(function(res) {
                $scope.items = res.data.results;
                $scope.loading = false;
                
                /* Pagination and Conditional */
                $scope.prev = res.data.previous;
                $scope.next = res.data.next;
                $scope.page = Number(res.data.previous.substr(-1))+1;
            });
        }  
    } else {
        
    } 
});

/* DETAIL CONTROLLER */
app.controller('DetailCtrl', function($scope,$state,$http) {
    
});

/* Slide Menu */
app.run(function($rootScope) {
    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });
});

/* Directive for Menu Wrapper */
app.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
        transclude: true,
        scope: {
            visible: "=",
            alignment: "@"
        }
    };
});

/* Directive for List Menu */
app.directive("menuItem", function() {
     return {
         restrict: "E",
         template: "<div ng-click='navigate()' ng-transclude></div>",
         transclude: true,
         scope: {
             hash: "@"
         },
         link: function($scope) {
             $scope.navigate = function() {
                 window.location.hash = $scope.hash;
             }
         }
     }
});