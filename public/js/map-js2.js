/**
 * http://usejsdoc.org/
 */
        uniqueCountries = [];
        
var todos = angular.module('page', ['ui.bootstrap']);

		//console.log(uniqueCountries);
	
            todos.controller('cntrlPage', function($scope,$http,$rootScope) {
               $scope.filteredTodos = []
              ,$scope.currentPage = 1
              ,$scope.numPerPage = 10
              ,$scope.maxSize = 5;

               $scope.todos = [];
              $scope.makeTodos = function() {
            	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
            	  $http.get('/disasters?disaster_type='+"all").success(function(data) {	  	
            		  console.log(data);	
            		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
            			
            		    var countries = [];
            		    var type = [];
            		    var noOfOccurrence = [];
            		    //var uniqueCountries = [];
            		    var uniqueISO = [];
            		    var iso = [];
            		    var prev;
            		    for(var i=0; i<data.disasters.length; i++){

            		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

            		         countries[i] = data.disasters[i].fields.primary_country.name;
            		         iso[i] = data.disasters[i].fields.primary_country.iso3;
            		          }
            		      }

            		      
            		      $.each(countries, function(i, el){
            		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
            		            });
            		      
            		      $.each(iso, function(i, el){
                              if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                          });

                    for(var i=0; i<uniqueISO.length;i++){
                      if(uniqueISO[i] != undefined){
                      uniqueISO[i] = uniqueISO[i].toUpperCase();
          	          }
          	        }
                          var sortedCountries = countries.sort();
                          var sortedISO = uniqueISO.sort();
                          for(var i=0; i<sortedCountries.length; i++){
                                
                              if(sortedCountries[i] != prev){
                                  noOfOccurrence.push(1);
                                  
                              }
                              else{
                                  noOfOccurrence[noOfOccurrence.length -1]++;
                                  
                              }
                              prev = countries[i];

                          }
            		console.log(noOfOccurrence);
            		      for (i=0;i<uniqueCountries.length;i++) {
                              $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                            }
                          
                          $scope.numPages = function () {
                            return Math.ceil($scope.todos.length / $scope.numPerPage);
                          };
                          
                          $scope.$watch('currentPage + numPerPage', function() {
                            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;
                            
                            $scope.filteredTodos = $scope.todos.slice(begin, end);
                          });
                          console.log(uniqueCountries.length);
            	});
              };
              $scope.makeTodos(); 
		      
            });
            
            todos.controller('cntrlPage2', function($scope,$http,$rootScope) {
            	
            	/*localization code */
            	function localize($scope, $locale){
            		$scope.localeId = $locale.id;
            	
            	}
            	
            	
                $scope.filteredTodos = []
               ,$scope.currentPage = 1
               ,$scope.numPerPage = 10
               ,$scope.maxSize = 5;

                $scope.todos = [];
               $scope.makeTodos = function() {
             	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
             	  $http.get('/disasters?disaster_type='+"earthquakes").success(function(data) {	  	
             		  // console.log(data);	
             		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
             			
             		    var countries = [];
             		    var type = [];
             		    var noOfOccurrence = [];
             		    //var uniqueCountries = [];
             		    var uniqueISO = [];
             		    var iso = [];
             		    var prev;
             		    
             		    for(var i=0; i<data.disasters.length; i++){

             		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

             		         countries[i] = data.disasters[i].fields.primary_country.name;
             		         iso[i] = data.disasters[i].fields.primary_country.iso3;
             		          }
             		      }

             		      
             		      $.each(countries, function(i, el){
             		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
             		            });
             		      
             		      $.each(iso, function(i, el){
                               if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                           });

                     for(var i=0; i<uniqueISO.length;i++){
                       if(uniqueISO[i] != undefined){
                       uniqueISO[i] = uniqueISO[i].toUpperCase();
           	          }
           	        }
                           var sortedCountries = countries.sort();
                           var sortedISO = uniqueISO.sort();
                           for(var i=0; i<sortedCountries.length; i++){
                                 
                               if(sortedCountries[i] != prev){
                                   noOfOccurrence.push(1);
                                   
                               }
                               else{
                                   noOfOccurrence[noOfOccurrence.length -1]++;
                                   
                               }
                               prev = countries[i];

                           }
             		console.log(noOfOccurrence);
             		      for (i=0;i<uniqueCountries.length;i++) {
                               $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                             }
                           
                           $scope.numPages = function () {
                             return Math.ceil($scope.todos.length / $scope.numPerPage);
                           };
                           
                           $scope.$watch('currentPage + numPerPage', function() {
                             var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                             , end = begin + $scope.numPerPage;
                             
                             $scope.filteredTodos = $scope.todos.slice(begin, end);
                           });
                           console.log(uniqueCountries.length);
             	});
               };
               $scope.makeTodos(); 
 		      
             });
            
            todos.controller('cntrlPage3', function($scope,$http,$rootScope) {
                $scope.filteredTodos = []
               ,$scope.currentPage = 1
               ,$scope.numPerPage = 10
               ,$scope.maxSize = 5;

                $scope.todos = [];
               $scope.makeTodos = function() {
             	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
             	  $http.get('/disasters?disaster_type='+"tornados").success(function(data) {	  	
             		  console.log(data);	
             		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
             			
             		    var countries = [];
             		    var type = [];
             		    var noOfOccurrence = [];
             		    //var uniqueCountries = [];
             		    var uniqueISO = [];
             		    var iso = [];
             		    var prev;
             		    for(var i=0; i<data.disasters.length; i++){

             		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

             		         countries[i] = data.disasters[i].fields.primary_country.name;
             		         iso[i] = data.disasters[i].fields.primary_country.iso3;
             		          }
             		      }

             		      
             		      $.each(countries, function(i, el){
             		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
             		            });
             		      
             		      $.each(iso, function(i, el){
                               if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                           });

                     for(var i=0; i<uniqueISO.length;i++){
                       if(uniqueISO[i] != undefined){
                       uniqueISO[i] = uniqueISO[i].toUpperCase();
           	          }
           	        }
                           var sortedCountries = countries.sort();
                           var sortedISO = uniqueISO.sort();
                           for(var i=0; i<sortedCountries.length; i++){
                                 
                               if(sortedCountries[i] != prev){
                                   noOfOccurrence.push(1);
                                   
                               }
                               else{
                                   noOfOccurrence[noOfOccurrence.length -1]++;
                                   
                               }
                               prev = countries[i];

                           }
             		console.log(noOfOccurrence);
             		      for (i=0;i<uniqueCountries.length;i++) {
                               $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                             }
                           
                           $scope.numPages = function () {
                             return Math.ceil($scope.todos.length / $scope.numPerPage);
                           };
                           
                           $scope.$watch('currentPage + numPerPage', function() {
                             var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                             , end = begin + $scope.numPerPage;
                             
                             $scope.filteredTodos = $scope.todos.slice(begin, end);
                           });
                           console.log(uniqueCountries.length);
             	});
               };
               $scope.makeTodos(); 
 		      
             });
            
            todos.controller('cntrlPage4', function($scope,$http,$rootScope) {
                $scope.filteredTodos = []
               ,$scope.currentPage = 1
               ,$scope.numPerPage = 10
               ,$scope.maxSize = 5;

                $scope.todos = [];
               $scope.makeTodos = function() {
             	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
             	  $http.get('/disasters?disaster_type='+"tsunamis").success(function(data) {	  	
             		  console.log(data);	
             		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
             			
             		    var countries = [];
             		    var type = [];
             		    var noOfOccurrence = [];
             		    //var uniqueCountries = [];
             		    var uniqueISO = [];
             		    var iso = [];
             		    var prev;
             		    for(var i=0; i<data.disasters.length; i++){

             		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

             		         countries[i] = data.disasters[i].fields.primary_country.name;
             		         iso[i] = data.disasters[i].fields.primary_country.iso3;
              		    	var href = data.disasters[i].href;
              		    	
             		          }
             		      }
    		    		console.log(href);
             		   $http.get(href).success(function(res) {
         		    		datOccured = res.data[0].fields.date.created;
        		    		console.log(datOccured);
        		    		
        		    		$.each(countries, function(i, el){
         		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
         		            });
         		      
         		      $.each(iso, function(i, el){
                           if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                       });

                 for(var i=0; i<uniqueISO.length;i++){
                   if(uniqueISO[i] != undefined){
                   uniqueISO[i] = uniqueISO[i].toUpperCase();
       	          }
       	        }
                       var sortedCountries = countries.sort();
                       var sortedISO = uniqueISO.sort();
                       for(var i=0; i<sortedCountries.length; i++){
                             
                           if(sortedCountries[i] != prev){
                               noOfOccurrence.push(1);
                               
                           }
                           else{
                               noOfOccurrence[noOfOccurrence.length -1]++;
                               
                           }
                           prev = countries[i];

                       }
         		console.log(noOfOccurrence);
         		      for (i=0;i<uniqueCountries.length;i++) {
                           $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                         }
                       
                       $scope.numPages = function () {
                         return Math.ceil($scope.todos.length / $scope.numPerPage);
                       };
                       
                       $scope.$watch('currentPage + numPerPage', function() {
                         var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                         , end = begin + $scope.numPerPage;
                         
                         $scope.filteredTodos = $scope.todos.slice(begin, end);
                       });
                       console.log(uniqueCountries.length);
         		    	});

             		      
             		      
             	});
               };
               $scope.makeTodos(); 
 		      
             });
            
            todos.controller('cntrlPage5', function($scope,$http,$rootScope) {
                $scope.filteredTodos = []
               ,$scope.currentPage = 1
               ,$scope.numPerPage = 10
               ,$scope.maxSize = 5;

                $scope.todos = [];
               $scope.makeTodos = function() {
             	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
             	  $http.get('/disasters?disaster_type='+"volcanos").success(function(data) {	  	
             		  console.log(data);	
             		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
             			
             		    var countries = [];
             		    var type = [];
             		    var noOfOccurrence = [];
             		    //var uniqueCountries = [];
             		    var uniqueISO = [];
             		    var iso = [];
             		    var prev;
             		    for(var i=0; i<data.disasters.length; i++){

             		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

             		         countries[i] = data.disasters[i].fields.primary_country.name;
             		         iso[i] = data.disasters[i].fields.primary_country.iso3;
              		    	var href = data.disasters[i].href;
              		    	
             		          }
             		      }
    		    		console.log(href);
             		   $http.get(href).success(function(res) {
         		    		datOccured = res.data[0].fields.date.created;
        		    		console.log(datOccured);
        		    		
        		    		$.each(countries, function(i, el){
         		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
         		            });
         		      
         		      $.each(iso, function(i, el){
                           if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                       });

                 for(var i=0; i<uniqueISO.length;i++){
                   if(uniqueISO[i] != undefined){
                   uniqueISO[i] = uniqueISO[i].toUpperCase();
       	          }
       	        }
                       var sortedCountries = countries.sort();
                       var sortedISO = uniqueISO.sort();
                       for(var i=0; i<sortedCountries.length; i++){
                             
                           if(sortedCountries[i] != prev){
                               noOfOccurrence.push(1);
                               
                           }
                           else{
                               noOfOccurrence[noOfOccurrence.length -1]++;
                               
                           }
                           prev = countries[i];

                       }
         		console.log(noOfOccurrence);
         		      for (i=0;i<uniqueCountries.length;i++) {
                           $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                         }
                       
                       $scope.numPages = function () {
                         return Math.ceil($scope.todos.length / $scope.numPerPage);
                       };
                       
                       $scope.$watch('currentPage + numPerPage', function() {
                         var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                         , end = begin + $scope.numPerPage;
                         
                         $scope.filteredTodos = $scope.todos.slice(begin, end);
                       });
                       console.log(uniqueCountries.length);
         		    	});

             		      
             		      
             	});
               };
               $scope.makeTodos(); 
 		      
             });
            
            todos.controller('cntrlPage6', function($scope,$http,$rootScope) {
                $scope.filteredTodos = []
               ,$scope.currentPage = 1
               ,$scope.numPerPage = 10
               ,$scope.maxSize = 5;

                $scope.todos = [];
               $scope.makeTodos = function() {
             	  //$http.getJSON('/disasters?disaster_type='+"all", function (data) {
             	  $http.get('/disasters?disaster_type='+"floods").success(function(data) {	  	
             		  console.log(data);	
             		    // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
             			
             		    var countries = [];
             		    var type = [];
             		    var noOfOccurrence = [];
             		    //var uniqueCountries = [];
             		    var uniqueISO = [];
             		    var iso = [];
             		    var prev;
             		    for(var i=0; i<data.disasters.length; i++){

             		      if(data.disasters[i].fields.hasOwnProperty('primary_country')){

             		         countries[i] = data.disasters[i].fields.primary_country.name;
             		         iso[i] = data.disasters[i].fields.primary_country.iso3;
              		    	var href = data.disasters[i].href;
              		    	
             		          }
             		      }
    		    		console.log(href);
             		   $http.get(href).success(function(res) {
         		    		datOccured = res.data[0].fields.date.created;
        		    		console.log(datOccured);
        		    		
        		    		$.each(countries, function(i, el){
         		                if($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
         		            });
         		      
         		      $.each(iso, function(i, el){
                           if($.inArray(el, uniqueISO) === -1) uniqueISO.push(el);
                       });

                 for(var i=0; i<uniqueISO.length;i++){
                   if(uniqueISO[i] != undefined){
                   uniqueISO[i] = uniqueISO[i].toUpperCase();
       	          }
       	        }
                       var sortedCountries = countries.sort();
                       var sortedISO = uniqueISO.sort();
                       for(var i=0; i<sortedCountries.length; i++){
                             
                           if(sortedCountries[i] != prev){
                               noOfOccurrence.push(1);
                               
                           }
                           else{
                               noOfOccurrence[noOfOccurrence.length -1]++;
                               
                           }
                           prev = countries[i];

                       }
         		console.log(noOfOccurrence);
         		      for (i=0;i<uniqueCountries.length;i++) {
                           $scope.todos.push({ text:uniqueCountries[i], no:noOfOccurrence[i], done:false});
                         }
                       
                       $scope.numPages = function () {
                         return Math.ceil($scope.todos.length / $scope.numPerPage);
                       };
                       
                       $scope.$watch('currentPage + numPerPage', function() {
                         var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                         , end = begin + $scope.numPerPage;
                         
                         $scope.filteredTodos = $scope.todos.slice(begin, end);
                       });
                       console.log(uniqueCountries.length);
         		    	});

             		      
             		      
             	});
               };
               $scope.makeTodos(); 
 		      
             });