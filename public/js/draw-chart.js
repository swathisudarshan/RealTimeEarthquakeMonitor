function draw_chart(type_disaster) {
    var type = [];
    var yearOfOccurrence = [];
    var noOfOccurrence = [];
    var uniqueYears = [];
    var sortedUniqueYears = [];
    var sortedYearOfOccurrence = [];
    var prev;
    jQuery.ajax({
        type: "GET",
        url: "/disasters?disaster_type="+type_disaster,
        contentType: "application/json; charset=utf-8",

        success: function(data, status, jqXHR) {
            for (var i = 0; i < data.count; i++) {
                if (data.disasters[i].fields.date.created) {
                    data.disasters[i].fields.date.created = data.disasters[i].fields.date.created.replace(data.disasters[i].fields.date.created.substring(4, data.disasters[i].fields.date.created.length), "");
                    yearOfOccurrence[i] = data.disasters[i].fields.date.created;
                }
            }
         sortedYearOfOccurrence = yearOfOccurrence.sort();

            $.each(sortedYearOfOccurrence, function(i, el) {
                if ($.inArray(el, uniqueYears) === -1) uniqueYears.push(el);
            });

            for (var i = 0; i < uniqueYears.length; i++) {
                type[i] = data.disasters[i].fields.primary_type.name;
            }

            sortedUniqueYears = uniqueYears.sort().map(Number);


            for (var i = 0; i < sortedYearOfOccurrence.length; i++) {

                if (sortedYearOfOccurrence[i] != prev) {
                    noOfOccurrence.push(1);

                } else {
                    noOfOccurrence[noOfOccurrence.length - 1]++;
                }

                prev = sortedYearOfOccurrence[i];

            }

         


            series = generateData(sortedUniqueYears, type, noOfOccurrence);



            function generateData(dates, names, times) {
                var ret = {},
                    ps = [],
                    series = [],
                    len = dates.length;

                    console.log("dates  " +dates);
                    console.log("names  " + names);
                    console.log("times  " + times);

                //concat to get points
                for (var i = 0; i < len; i++) {
                    ps[i] = {
                        x: dates[i],
                        y: times[i],
                        n: names[i]
                    };
                }
                names = [];
                //generate series and split points
                for (i = 0; i < len; i++) {
                    var p = ps[i],
                        sIndex = $.inArray(p.n, names);

                    if (sIndex < 0) {
                        sIndex = names.push(p.n) - 1;
                        series.push({
                            name: p.n,
                            data: []
                        });
                    }
                    series[sIndex].data.push(p);
                }
                return series;
            }




            $('#chart-container').highcharts({
            	 chart: {
                     type: 'column'
                 },
                title: {
                    text: "SEISMIC ACTIVITY",
                    x: -20 //center
                },
                subtitle: {
                    text: 'Year',
                    x: -20
                },
                yAxis: {
                    title: {
                        text: 'Occurrence'
                    }
                },
                plotOptions: {
                	column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        color: "#04379b"
                     }
                },
                tooltip: {
                    valueSuffix: ' Times'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: series
            });
        },

        error: function(jqXHR, status) {
            console.log(status);
        }
    });
}






