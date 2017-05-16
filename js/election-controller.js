/* COLOURS

rgb(0,135,220)  Conservative Blue
rgb(220,36,31)  Labour Red
rgb(253,187,48) Lib Dem Yellow
rbg(112,20,122) UKIP Purple
rgb(120,184,42) Green Party Green
rgb(136,136,136)Independent Grey
*/

(function (angular) {
    
    'use strict';
    angular.module('app', ['ngRoute', 'chart.js'])
    
    // Controller for bringing in JSON data from files
    .controller('ElectionsController', ['$scope','$http', function ($scope, $http) {
         
        $http.get('data/data.json').success(function(data) {
            
            $scope.elections = data;
            angular.forEach(data.elections, function(value, key) {
                $scope.elections.push(value);
            });

            $scope.selectedElection = $scope.elections[0];
            
            $scope.$watch('selectedElection', function(){
            
                $scope.selectedWard = $scope.selectedElection.wards[0];

                $scope.$watch('selectedWard', function(){

                    $scope.selectedWardResults = $scope.selectedWard.results;
                    
                    //Create empty arrays to pop our data into
                    $scope.candidates = [];
                    $scope.parties = [];
                    $scope.votes = [];
                    
                    //Push our data into our separated arrays
                    angular.forEach($scope.selectedWardResults, function(value, key) {
                        $scope.candidates.push(value.candidate);
                        $scope.parties.push(value.party)
                        $scope.votes.push(value.votes);
                    });
                    
                    //Set the default colours
                    var theColours = ["rgb(0,0,0)","rgb(48,48,48)","rgb(96,96,96)","rgb(144,144,144)","rgb(192,192,192)","rgb(240,240,240)"];
                    
                    //Loop through each party, assign a colour for the common ones
                    for(var i = 0; i < $scope.parties.length; i++){
                        if($scope.parties[i].includes("Conservative")){
                            theColours[i] = "rgb(0,135,220)"
                        } else if($scope.parties[i].includes("Labour")){
                            theColours[i] = "rgb(220,36,31)"
                        } else if($scope.parties[i].includes("Liberal")){
                            theColours[i] = "rgb(253,187,48)"
                        } else if($scope.parties[i].includes("UKIP")){
                            theColours[i] = "rgb(112,20,122)"
                        } else if($scope.parties[i].includes("Green")){
                            theColours[i] = "rgb(120,184,42)"
                        } else if($scope.parties[i].includes("Independent")){
                            theColours[i] = "rgb(144,144,144)"
                        } else if($scope.parties[i].includes("Trade Unionist and")){
                            theColours[i] = "rgb(221,19,121)"
                        }
                                                
                    }
                    
                    //Set the data for our chart
                    $scope.labels = $scope.candidates;
                    $scope.votes = $scope.votes;
                    $scope.colours = theColours;
                });
                
            });
            
        });
        
    }]);   
    
})(window.angular);
