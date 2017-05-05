var http = require('http');
var path = require('path');

var next = 0;
var allDisasters = [];
var topDisasters = [];
var earthquakes = [];
var floods = [];
var tsunamis = [];
var volcanos = [];
var tornados = [];
var alertsJSON = [];
var sortedMapValues = [];


function sortMapValues(){
	var tempArr = [];
	for(var i = 0; i < allDisasters.length; i++){
		var flag = -1;
		if(allDisasters[i].fields!==undefined && allDisasters[i].fields.primary_country!==undefined && allDisasters[i].fields.primary_country.location!==undefined){
			for(var j = 0; j<tempArr.length; j++){
				if(tempArr[j].long === allDisasters[i].fields.primary_country.location[1] && tempArr[j].lat === allDisasters[i].fields.primary_country.location[0]){
					flag = j;
				}
			}
			if(flag!=-1){
				if(flag<6){
					tempArr[flag].mag = 6;
				}else{
					tempArr[flag].mag++;
				}		
				tempArr[flag].mag = 5;
			}else{
				var mag;			
				if(allDisasters[j].fields.primary_type.code.toLowerCase()==="ff" || allDisasters[j].fields.primary_type.code.toLowerCase()==="fl"){
	    			mag = 0.15;
	    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="eq"){
	    			mag = 0.3;
	    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="ts"){
	    			mag = 0.45;
	    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="vo"){
	    			mag = 0.6;
	    		}else{
	    			mag = 0.75;
	    		}				
				var tempVar = {
						long : allDisasters[i].fields.primary_country.location[1],
						lat : allDisasters[i].fields.primary_country.location[0],
						mag : mag
				};
				tempArr.push(tempVar);
			}
		}
	}
	sortedMapValues = tempArr;	
	tempArr = [];
	for(i=0; i< sortedMapValues.length; i++){
		tempArr.push(sortedMapValues[i].long);
		tempArr.push(sortedMapValues[i].lat);
		tempArr.push(sortedMapValues[i].mag);
	}
	var temp = ["2000"];
	temp.push(tempArr);
	alertsJSON.push(temp);
}

var callback = function(response) {
	  var str = '';
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  response.on('error', function(err){
		  console.log(err);
	  });
	  response.on('end', function () {
		  var res = JSON.parse(str);
	    if(res.data && res.data.length>0){
	    	for(var i = 0; i <res.data.length; i++){
	    		allDisasters.push(res.data[i]);
	    		if(next === 0 && i<20){
	    			topDisasters.push(res.data[i]);
	    		}
	    		if(res.data[i].fields.primary_type.code !== undefined){
		    		if(res.data[i].fields.primary_type.code.toLowerCase()==="eq"){
		    			earthquakes.push(res.data[i]);
		    		}else if(res.data[i].fields.primary_type.code.toLowerCase()==="ff" || res.data[i].fields.primary_type.code.toLowerCase()==="fl"){
		    			floods.push(res.data[i]);
		    		}else if(res.data[i].fields.primary_type.code.toLowerCase()==="ts"){
		    			tsunamis.push(res.data[i]);
		    		}else if(res.data[i].fields.primary_type.code.toLowerCase()==="vo"){
		    			volcanos.push(res.data[i]);
		    		}else if(res.data[i].fields.primary_type.code.toLowerCase()==="st" || res.data[i].fields.primary_type.code.toLowerCase()==="SS"){
		    			tornados.push(res.data[i]);
		    		}
	    		}else{
	    			console.log(res.data[i].fields);
	    		}
	    	}
	    }
	    if(res.links.next && res.links.next!==undefined){
	    	next = next + 1000;
	    	callApi(next);
	    }else{
	    	next = 0;
	    	//sortMapValues();
	    	var tempArr = [];    	
	    	
	    	for(var j = 0; j < allDisasters.length; j++){
	    		if(allDisasters[j].fields!==undefined && allDisasters[j].fields.primary_country!==undefined && allDisasters[j].fields.primary_country.location!==undefined){
		    		tempArr.push(allDisasters[j].fields.primary_country.location[1]);
		    		tempArr.push(allDisasters[j].fields.primary_country.location[0]);
		    		if(allDisasters[j].fields.primary_type.code.toLowerCase()==="ff" || allDisasters[j].fields.primary_type.code.toLowerCase()==="fl"){
		    			tempArr.push(0.15);
		    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="eq"){
		    			tempArr.push(0.3);
		    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="ts"){
		    			tempArr.push(0.45);
		    		}else if(allDisasters[j].fields.primary_type.code.toLowerCase()==="vo"){
		    			tempArr.push(0.6);
		    		}else{
		    			tempArr.push(0.75);
		    		}
		    		
	    		}
	    	}
	    	
	    	var temp = ["2000"];
	    	temp.push(tempArr);
	    	alertsJSON.push(temp);
	    	
	    }
	  });
};



function callApi(offset){
	var options = {
			host: 'api.rwlabs.org',
			path: '/v1/disasters?limit=1000&offset='+offset+'&fields[include][]=primary_type&fields[include][]=primary_country&fields[include][]=date&fields[include][]=featured&sort[]=date:desc',
			method: 'GET'
	};

	var req = http.request(options, callback);
	req.end();
}

exports.getAlerts = function(){
	callApi(0);
	setTimeout(function(){
		console.log(allDisasters.length);
		console.log(earthquakes.length);
		console.log(floods.length);
		console.log(tsunamis.length);
		console.log(volcanos.length);
	},6000);
};

exports.getDisasters = function(req, res){
	var disaster_type = req.body.disaster_type;
	console.log("disaster_type:*******");
	console.log(req.body.disaster_type);
	console.log(earthquakes.length);
	if(disaster_type === undefined){
		disaster_type = req.query.disaster_type;
	}
	
	if(disaster_type === "all"){
		res.send({result : "success", count : allDisasters.length, disasters : allDisasters});
	}else if(disaster_type === "top"){
		res.send({result : "success", count : topDisasters.length, disasters : topDisasters});	
	}else if(disaster_type === "earthquakes"){
		res.send({result : "success", count : earthquakes.length, disasters : earthquakes});	
	}else if(disaster_type === "floods"){
		res.send({result : "success", count : floods.length, disasters : floods});	
	}else if(disaster_type === "tsunamis"){
		res.send({result : "success", count : tsunamis.length, disasters : tsunamis});
	}else if(disaster_type === "volcanos"){
		res.send({result : "success", count : volcanos.length, disasters : volcanos});
	}else if(disaster_type === "tornados"){
		res.send({result : "success", count : tornados.length, disasters : tornados});
	}else{
		res.send({result : "failure"});
	}		
};

exports.getAlertsJSON = function(req, res){
	var retData = JSON.stringify(alertsJSON);
	res.setHeader('content-type', 'application/json');
	res.end(retData);
};

exports.getDisasterCounts = function(req, res){
	var retData = {};
	retData.tsunamis = tsunamis.length;
	retData.volcanos = volcanos.length;
	retData.earthquakes = earthquakes.length;
	retData.tornados = tornados.length;
	retData.floods = floods.length;

	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(retData));
};

