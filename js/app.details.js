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
    if($stateParams.id==1) {
        $scope.showPeople = true;
        $scope.loadList = true;
        var getPeople = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getPeople)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get Homeworld */
            $http.get($stateParams.url)
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
            
            /* Get List Species */
            $scope.itemSpecies = [];
            angular.forEach(res.data.species, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemSpecies.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Vehicles */
            $scope.itemVehicles = [];
            angular.forEach(res.data.vehicles, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemVehicles.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Starships */
            $scope.itemStarships = [];
            angular.forEach(res.data.starships, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemStarships.push({
                        name: res.data.name,
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
                gender: res.data.gender
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.name;
            $scope.icon = 'ion-android-person';
        });
    }
    
    /* FILMS DETAILS */
    if($stateParams.id==2) {
        $scope.showFilms = true;
        $scope.loadList = true;
        var getFilms = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getFilms)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get List Character */
            $scope.itemCharF = [];
            angular.forEach(res.data.characters, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemCharF.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Planets */
            $scope.itemPlanetsF = [];
            angular.forEach(res.data.planets, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemPlanetsF.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Starship */
            $scope.itemShipF = [];
            angular.forEach(res.data.starships, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemShipF.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Vehicles */
            $scope.itemVehiclesF = [];
            angular.forEach(res.data.vehicles, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemVehiclesF.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Species */
            $scope.itemSpeciesF = [];
            angular.forEach(res.data.species, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemSpeciesF.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* View Data Films */
            $scope.films = {
                episode: res.data.episode_id,
                director: res.data.director,
                producer: res.data.producer,
                date: res.data.release_date
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.title;
            $scope.icon = 'ion-android-film';
            $scope.desc = res.data.opening_crawl;
        });
    }
    
    /* STARSHIPS DETAILS */
    if($stateParams.id==3) {
        $scope.showStarships = true;
        $scope.loadList = true;
        var getStarships = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getStarships)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get List Pilots */
            $scope.itemPilots = [];
            angular.forEach(res.data.pilots, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemPilots.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Films */
            $scope.itemFilmsS = [];
            angular.forEach(res.data.films, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemFilmsS.push({
                        name: res.data.title,
                        url: res.data.url
                    });
                });
            });
            
            /* View Data Starships */
            $scope.ship = {
                model: res.data.model,
                manufacturer: res.data.manufacturer,
                cost: res.data.cost_in_credits,
                length: res.data.length,
                max: res.data.max_atmosphering_speed,
                crew: res.data.crew,
                passengers: res.data.passengers,
                cargo: res.data.cargo_capacity,
                consumables: res.data.consumables,
                rating: res.data.hyperdrive_rating,
                mglt: res.data.mglt,
                class: res.data.starship_class,
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.name;
            $scope.icon = 'ion-jet';
        });
    }
});