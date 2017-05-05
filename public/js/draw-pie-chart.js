   var floody=0;
    var cold=0;
    var quake=0;
    var Epidemic=0;
    var drought = 0;
    var volcano = 0;
    var wild = 0;
    var tsunami = 0;
    var fire = 0;
    var other = 0;
    var landSlide = 0;
    var tropical = 0;
    var technoDisaster = 0;
    var flashFlood = 0;
    var severeStorm = 0;
    var heat = 0;
    var insectI = 0;
    var snowAval = 0;
    var fff= 0;
    var stormSurge = 0;
    var Extra = 0;   

     function draw_pie_chart(type_disaster) {
 

     jQuery.ajax({
         type: "GET",
         url: "/disasters?disaster_type="+type_disaster,
         contentType: "application/json; charset=utf-8",
    
         success: function (data, status, jqXHR) {
         
              

             for(var i=0; i<data.disasters.length;i++){
                if(data.disasters[i].fields.primary_type.name == "Flood") { 
                                        floody += 1;
                                 } 
                if(data.disasters[i].fields.primary_type.name == '"Cold Wave"') { 
                                     cold += 1;
                             }
                                if(data.disasters[i].fields.primary_type.name == "Earthquake") { 
                                    quake +=1;
                                 }
                                if(data.disasters[i].fields.primary_type.name== "Epidemic") { 
                                    Epidemic +=1;
                                }
                                if(data.disasters[i].fields.primary_type.name == "Extra-Tropical Cyclone") { 
                                    Extra +=1;
                                }
                                if(data.disasters[i].fields.primary_type.name == "Fire") { 
                                    fire += 1;
                                 }
                                if(data.disasters[i].fields.primary_type.name == "Flash Flood") { 
                                    flashFlood +=1;
                                }
                                if(data.disasters[i].fields.primary_type.name == "Flash Flood And Flood") { 
                                     fff +=1;
                                 }
                                if(data.disasters[i].fields.primary_type.name == "Heat Wave") { 
                                    heat +=1;
                                }
                                if(data.disasters[i].fields.primary_type.name == "Insect Infestation") { 
                                     insectI +=1; 
                                }
                                if(data.disasters[i].fields.primary_type.name == "Land Slide") { 
                                    landSlide +=1;
                                 }
                                if(data.disasters[i].fields.primary_type.name == "Other") { 
                                    other += 1;
                                 }
                                if(data.disasters[i].fields.primary_type.name== "Severe Local Storm") { 
                                    severeStorm += 1;
                                 }
                                if(data.disasters[i].fields.primary_type.name == "Snow Avalanche") { 
                                    snowAval += 1; 
                                 }
                                if(data.disasters[i].fields.primary_type.name == "Storm Surge") { 
                                    stormSurge += 1; 
                                }  
                                if(data.disasters[i].fields.primary_type.name== "Technological Disaster") { 
                                    technoDisaster +=1;
                                 }        
                                if(data.disasters[i].fields.primary_type.name == "Tropical Cyclone") { 
                                    tropical +=1;
                                 }             
                                if(data.disasters[i].fields.primary_type.name == "Tsunami") { 
                                    tsunami +=1 
                                 }          
                                if(data.disasters[i].fields.primary_type.name == "Volcano") { 
                                    volcano +=1;
                                 }     
                                if(data.disasters[i].fields.primary_type.name == "Wild Fire") { 
                                    wild +=1;
                                }
                                if(data.disasters[i].fields.primary_type.name == "Drought") { 
                                    drought +=1; 
                                 }
             }

   
             displayMap();
 },

         error: function (jqXHR, status) {
              console.log(status);
         }
});
 }


                   $(function() {
                    displayMap();
});



                   function displayMap(){
                        var floodyNum = parseInt(floody);
    $('#pie-chart-container').highcharts({
        chart: {
        
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }

        },

        title: {
            text: 'All Disasters'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth : 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },

        },
        series: [{
            type : 'pie',
            name: 'Occurrence of Disasters',
            
            data: [{
                name: 'Floods',
                y: floody,
                sliced: true,
                selected: true
            }, {
                name: 'Drought',
                y: drought
                
            }, {
                name: 'Fire',
                y: fire
            }, {
                name: 'Cold Wave',
                y: cold
            }, {
                name: 'Epidemic',
                y: Epidemic
            }, 
            {
                name: 'Wild Fire',
                y: wild
            }, 
            {
                name: 'Tsunami',
                y: tsunami
            }, 

            {
                name: 'other',
                y: other
            }, 
            {
                name: 'Landslide',
                y: landSlide
            }, 
            {
                name: 'Tropical Cyclone',
                y: tropical
            }, 
            {
                name: 'Technological disaster',
                y: technoDisaster
            }, 
             {
                name: 'Flash Flood',
                y: flashFlood
            }, 
             {
                name: 'Severe local storm',
                y: severeStorm
            }, 
             {
                name: 'Heat Wave',
                y: heat
            }, 
             {
                name: 'Insect Infestation',
                y: insectI
            }, 
             {
                name: 'Snow Avalanche',
                y: snowAval
            }, 
            {
                name: 'Flash flood and Flood',
                y: fff
            }, 
            {
                name: 'Earthquake',
                y: quake
            }, 
            {
                name: 'Storm surge',
                y: stormSurge
            },
            {
                name: 'Extra-tropical cyclone',
                y: Extra
            },  
            {
                name: 'Volcano',
                y: volcano
            }]
        }]
    });
    }