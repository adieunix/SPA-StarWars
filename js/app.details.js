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
        $state.go('details',{id:localStorage.getItem('id'),url:localStorage.getItem('url')});
        if(localStorage.getItem('id2')==null && localStorage.getItem('url2')==null) history.back();
    }
    
    /* Use localStorage for back view inside a single state */
    if(localStorage.getItem('id2')!=null && localStorage.getItem('url2')!=null) {
        localStorage.setItem('id',localStorage.getItem('id2'));
        localStorage.setItem('url',localStorage.getItem('url2'));
    }    
    if(localStorage.getItem('id')!=null && localStorage.getItem('url')!=null) {
        localStorage.setItem('id2',$stateParams.id);
        localStorage.setItem('url2',$stateParams.url);
    } else {
        localStorage.setItem('id',$stateParams.id);
        localStorage.setItem('url',$stateParams.url);
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
            $http.get(res.data.homeworld)
            .then(function(res) {
                $scope.home = res.data.name;
                $scope.hurl = res.data.url;
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
    
    
    /* VEHICLES DETAILS */
    if($stateParams.id==4) {
        $scope.showVehicles = true;
        $scope.loadList = true;
        var getVehicles = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getVehicles)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get List Pilots */
            $scope.itemPilotsV = [];
            angular.forEach(res.data.pilots, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemPilotsV.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Films */
            $scope.itemFilmsV = [];
            angular.forEach(res.data.films, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemFilmsV.push({
                        name: res.data.title,
                        url: res.data.url
                    });
                });
            });
            
            /* View Data Vehicles */
            $scope.vehicle = {
                model: res.data.model,
                manufacturer: res.data.manufacturer,
                cost: res.data.cost_in_credits,
                length: res.data.length,
                max: res.data.max_atmosphering_speed,
                crew: res.data.crew,
                passengers: res.data.passengers,
                cargo: res.data.cargo_capacity,
                consumables: res.data.consumables,
                class: res.data.vehicle_class
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.name;
            $scope.icon = 'ion-android-car';
        });
    }
    
    
    /* SPECIES DETAILS */
    if($stateParams.id==5) {
        $scope.showSpecies = true;
        $scope.loadList = true;
        var getSpecies = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getSpecies)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get Homeworld */
            $http.get(res.data.homeworld)
            .then(function(res) {
                $scope.hhome = res.data.name;
                $scope.urlh = res.data.url;
            });
            
            /* Get List People */
            $scope.itemPeopleS = [];
            angular.forEach(res.data.people, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemPeopleS.push({
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
            
            /* View Data Species */
            $scope.species = {
                classification: res.data.classification,
                designation: res.data.designation,
                avg: res.data.average_height,
                skin: res.data.skin_colors,
                lifespan: res.data.average_lifespan,
                language: res.data.language
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.name;
            $scope.icon = 'ion-ios-body';
        });
    }
    
    
    /* PLANETS DETAILS */
    if($stateParams.id==6) {
        $scope.showPlanets = true;
        $scope.loadList = true;
        var getSpecies = {
            method: 'GET',
            url: $stateParams.url
        }
        $http(getSpecies)
        .then(function(res) {
            $scope.loading = false;
            
            /* Get List Resident */
            $scope.itemResident = [];
            angular.forEach(res.data.residents, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemResident.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                });
            });
            
            /* Get List Films */
            $scope.itemFilmsP = [];
            angular.forEach(res.data.films, function(v,k) {
                $http.get(v)
                .then(function(res) {
                    $scope.loadList = false;
                    $scope.itemFilmsP.push({
                        name: res.data.title,
                        url: res.data.url
                    });
                });
            });
            
            /* View Data Planets */
            $scope.planets = {
                rotation: res.data.rotation_period,
                orbit: res.data.orbital_period,                
                diameter: res.data.diameter,                
                climate: res.data.climate,                
                surface: res.data.surface_water,                
                gravity: res.data.gravity,                
                terrain: res.data.terrain,                
                population: res.data.population,                
            }
            
            /* View Data Panel Heading */
            $scope.title = res.data.name;
            $scope.icon = 'ion-planet';
        });
    }
});