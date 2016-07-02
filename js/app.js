var app = angular.module("swApp", ['ui.router','sw.home','sw.details']);

/* API SERVICE */
/*=============*/
app.factory('Service', function() {
    return {
        API: 'http://swapi.co/api/'
    }
})


/* SET STATE PROVIDER */
/*====================*/
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        cache: false,
        url: '/home',
        templateUrl: "pages/home.html",
        controller: 'HomeCtrl',
        params: {
            id: null,
            url: null
        }
    })
    
    .state('details', {
        cache: false,
        url: '/details',
        templateUrl: "pages/details.html",
        controller: 'DetailsCtrl',
        params: {
            id: null,
            url: null
        }
    })
    
    $urlRouterProvider.otherwise('/home');
});  


/*  MAIN CONTROLLER */
/*====================*/
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


/* SLIDE MENU EVENTS */
/*===================*/
app.run(function($rootScope) {
    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });
});


/* DIRECTIVE FOR MENU WRAPPER */
/*============================*/
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


/* DIRECTIVE FOR LIST MENU */
/*=========================*/
app.directive("menuItem", function() {
     return {
         restrict: "E",
         template: "<div ng-click='navigate()' ng-transclude></div>",
         transclude: true,
         scope: {
             hash: "@"
         }
     }
});


/* DIRECTIVE FOR NG-HTML */
app.directive('ngHtml', ['$compile', function($compile) {
    return function(scope, elem, attrs) {
        if(attrs.ngHtml){
            elem.html(scope.$eval(attrs.ngHtml));
            $compile(elem.contents())(scope);
        }
        scope.$watch(attrs.ngHtml, function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                elem.html(newValue);
                $compile(elem.contents())(scope);
            }
        });
    };
}]);