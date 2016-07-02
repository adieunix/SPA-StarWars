angular.module('sw.details', [])
.controller('DetailsCtrl', function($scope,$state,$http,Service,$stateParams) {
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
    
    /* Back button */
    $scope.back = function() {
        window.history.back();
    }
    
    /* PEOPLE DETAILS */
//    if($stateParams.id==1) {
        $scope.loading = false;
        $scope.showPeople = true;
        $scope.loadList = true;
        var getPeople = {
            method: 'GET',
            url: 'http://swapi.co/api/people/1'
        }
        $http(getPeople)
        .then(function(res) {
            
            /* Get Homeworld */
            $http.get('http://swapi.co/api/planets/1/')
            .then(function(res) {
                $scope.home = res.data.name
            });
            
            /* Get List Films */
            $scope.itemFilms = [];
            angular.forEach(res.data.films, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemFilms.push({
                        title: res.data.title,
                        url: res.data.url
                    });
                });
            });
            
            /* View Data Profile */
            $scope.profile = {
                height: res.data.height,
                mass: res.data.mass,
                hair: res.data.hair_color,
                skin: res.data.skin_color,
                eye: res.data.eye_color,
                birth: res.data.birth_year,
                gender: res.data.gender,
                name: res.data.name,
                icon: 'ion-android-person'
            }
        });
//    }
});