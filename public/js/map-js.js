var type_disaster;
var all_text;
function draw_map(type_of_disaster) {
	type_disaster = type_of_disaster;
	if(type_disaster==="all"){
		type_disaster = "all disasters";
	}
	type_disaster_caps = type_disaster[0].toUpperCase()+type_disaster.substring(1,type_disaster.length);
	
    $.getJSON('/disasters?disaster_type='+type_of_disaster, function (data) {

        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat

        var countries = [];
        var type = [];
        var noOfOccurrence = [];
        var uniqueCountries = [];
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
          console.log(uniqueCountries.length + "---------")
          		var sortedCountriesOfCountries = uniqueCountries.sort();
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
                var x = [];
            
                console.log(noOfOccurrence.length)
                var arr = [];
                var cfv2 = countries.sort();
            for (var i = 0; i < uniqueISO.length; i++) {
                arr.push({
                    code: sortedISO[i],
                    value: noOfOccurrence[i],
                    name: sortedCountriesOfCountries[i],

                });
            }
            console.log("sortedISO "  + sortedISO.length);
            console.log("sortedCountriesOfCountries  " + sortedCountriesOfCountries.length);
            console.log("noOfOccurrence "+noOfOccurrence.length)



        $.each(arr, function () {

              this.flag = this.code;
        });
// console.log("arra0   " +JSON.stringify(arr));
            $('#container11').highcharts('Map', {

                title: {
                    text: 'Global Seismic Distribution'
                },

                legend: {
                    title: {
                        text: 'No of occurances',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                tooltip: {
                    backgroundColor: 'none',
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    padding: 0,
                    pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
                        ' {point.name}: <b>{point.value}</b>/times',
                    positioner: function () {
                        return { x: 0, y: 250 };
                    }
                },

                colorAxis: {
                    min: 1,
                    max: 1000,
                    type: 'logarithmic'
                },

                series : [{
                    data : arr,
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a3', 'code'],
                    name: type_disaster_caps,
                    states: {
                        hover: {
                            color: 'Yellow'
                        }
                    }
                }]
            });
        });
}