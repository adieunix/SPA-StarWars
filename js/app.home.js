angular.module('sw.home', [])
.controller('HomeCtrl', function($scope,$state,$http,Service,$stateParams) {
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
    $scope.pagination = true;
    
    /* Search filter */
    $scope.searchList = '';
    
    /* Clear all local storage */
    localStorage.clear();
    
    /* Button trigger for Prev/Next */
    $scope.pushPrev = function(url,id) {
        $state.go('home',{id:id,url:url});
    }
    $scope.pushNext = function(url,id) {
        $state.go('home',{id:id,url:url});
    }
    
    /* Condition for PEOPLE or Not */
    /*-----------------------------*/
    if($stateParams.id==null || $stateParams.id==1) { 
        $scope.title = 'People';
        $scope.listIcon = 'ion-android-person';
        $scope.id = 1;
        
        if($stateParams.url==null) {
            /* Get People First Page */
            var getPeople = {
                method: 'GET',
                url: Service.API+'people'
            }
            $http(getPeople)
            .then(function(res) {
                /* Parsing Data */
                $scope.items = res.data.results;
                $scope.loading = false;
                
                /* Hide pagination for list < 10 */
                if(res.data.next==null && res.data.previous==null) {
                    $scope.pagination = true;
                } else {
                    $scope.pagination = false;
                }

                /* Pagination and Conditional */
                $scope.prev = res.data.previous;
                $scope.next = res.data.next;
                
                /* Get page number */
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
                /* Parsing Data */
                $scope.items = res.data.results;
                $scope.loading = false;
                $scope.pagination = false;
                
                /* Pagination and Conditional */
                $scope.prev = res.data.previous;
                $scope.next = res.data.next;
                $scope.page = Number(res.data.previous.substr(-1))+1;
            });
        }  
    } else {
        /* Condition for FILMS */
        /*---------------------*/
        if($stateParams.id==2) {
            $scope.title = 'Films';
            $scope.listIcon = 'ion-android-film';
            $scope.id = 2;  
            
            if($stateParams.url==null) {                
                /* Get Films First Page */
                var getFilms = {
                    method: 'GET',
                    url: Service.API+'films'
                }
                $http(getFilms)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = [];
                    angular.forEach(res.data.results, function(v,k) {
                        $scope.items.push({
                            name: res.data.results[k].title
                        });
                    });
                    $scope.loading = false;
                    
                    /* Hide pagination for list < 10 */
                    if(res.data.next==null && res.data.previous==null) {
                        $scope.pagination = true;
                    } else {
                        $scope.pagination = false;
                    }

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    
                    /* Get page number */
                    if(res.data.previous==null) {
                        $scope.page = 1;
                    } else {
                        $scope.page = Number(res.data.previous.substr(-1))+1;
                    }
                });
            } else {
                /* Get Films Next Page */
                var getNextFilms = {
                    method: 'GET',
                    url: $stateParams.url
                }
                $http(getNextFilms)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = [];
                    angular.forEach(res.data.results, function(v,k) {
                        $scope.items.push({
                            name: res.data.results[k].title
                        });
                    });
                    $scope.loading = false;
                    $scope.pagination = false;

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                });
            }
        }
        
        /* Condition for STARSHIP */
        /*---------------------*/
        if($stateParams.id==3) {
            $scope.title = 'Starships';
            $scope.listIcon = 'ion-jet';
            $scope.id = 3;
            
            if($stateParams.url==null) {
                /* Get Starship First Page */
                var getStarship = {
                    method: 'GET',
                    url: Service.API+'starships'
                }
                $http(getStarship)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    
                    /* Hide pagination for list < 10 */
                    if(res.data.next==null && res.data.previous==null) {
                        $scope.pagination = true;
                    } else {
                        $scope.pagination = false;
                    }

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    
                    /* Get page number */
                    if(res.data.previous==null) {
                        $scope.page = 1;
                    } else {
                        $scope.page = Number(res.data.previous.substr(-1))+1;
                    }
                });
            } else {
                /* Get Starship Next Page */
                var getNextStarship = {
                    method: 'GET',
                    url: $stateParams.url
                }
                $http(getNextStarship)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    $scope.pagination = false;

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                });
            }
        }
        
        /* Condition for VEHICLES */
        /*---------------------*/
        if($stateParams.id==4) {
            $scope.title = 'Vehicles';
            $scope.listIcon = 'ion-android-car';
            $scope.id = 4;
            
            if($stateParams.url==null) {
                /* Get Vehicles First Page */
                var getVehicle = {
                    method: 'GET',
                    url: Service.API+'starships'
                }
                $http(getVehicle)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    
                    /* Hide pagination for list < 10 */
                    if(res.data.next==null && res.data.previous==null) {
                        $scope.pagination = true;
                    } else {
                        $scope.pagination = false;
                    }

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    
                    /* Get page number */
                    if(res.data.previous==null) {
                        $scope.page = 1;
                    } else {
                        $scope.page = Number(res.data.previous.substr(-1))+1;
                    }
                });
            } else {
                /* Get Vehicles Next Page */
                var getNextVehicle = {
                    method: 'GET',
                    url: $stateParams.url
                }
                $http(getNextVehicle)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    $scope.pagination = false;

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                });
            }
        }
        
        /* Condition for SPECIES */
        /*---------------------*/
        if($stateParams.id==5) {
            $scope.title = 'Species';
            $scope.listIcon = 'ion-ios-body';
            $scope.id = 5;
            
            if($stateParams.url==null) {
                /* Get Species First Page */
                var getSpecies = {
                    method: 'GET',
                    url: Service.API+'species'
                }
                $http(getSpecies)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    
                    /* Hide pagination for list < 10 */
                    if(res.data.next==null && res.data.previous==null) {
                        $scope.pagination = true;
                    } else {
                        $scope.pagination = false;
                    }

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    
                    /* Get page number */
                    if(res.data.previous==null) {
                        $scope.page = 1;
                    } else {
                        $scope.page = Number(res.data.previous.substr(-1))+1;
                    }
                });
            } else {
                /* Get Species Next Page */
                var getNextSpecies = {
                    method: 'GET',
                    url: $stateParams.url
                }
                $http(getNextSpecies)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    $scope.pagination = false;

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                });
            }
        }
        
        /* Condition for PLANETS */
        /*---------------------*/
        if($stateParams.id==6) {
            $scope.title = 'Planets';
            $scope.listIcon = 'ion-planet';
            $scope.id = 6;
            
            if($stateParams.url==null) {
                /* Get Planets First Page */
                var getPlanet = {
                    method: 'GET',
                    url: Service.API+'planets'
                }
                $http(getPlanet)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    
                    /* Hide pagination for list < 10 */
                    if(res.data.next==null && res.data.previous==null) {
                        $scope.pagination = true;
                    } else {
                        $scope.pagination = false;
                    }

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    
                    /* Get page number */
                    if(res.data.previous==null) {
                        $scope.page = 1;
                    } else {
                        $scope.page = Number(res.data.previous.substr(-1))+1;
                    }
                });
            } else {
                /* Get Planets Next Page */
                var getNextPlanet = {
                    method: 'GET',
                    url: $stateParams.url
                }
                $http(getNextPlanet)
                .then(function(res) {
                    /* Parsing Data */
                    $scope.items = res.data.results;
                    $scope.loading = false;
                    $scope.pagination = false;

                    /* Pagination and Conditional */
                    $scope.prev = res.data.previous;
                    $scope.next = res.data.next;
                    $scope.page = Number(res.data.previous.substr(-1))+1;
                });
            }
        }
    }
});