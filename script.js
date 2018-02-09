var dailyData;
var sensorData;
var dailyDataGroupedByDate;

d3.csv("./counts_all_2017.csv", function (error, data) {
    dailyData = data;
    dailyData = _.filter(dailyData, d => { return d.Count != "NA" });

    dailyDataGroupedByDate =  _.groupBy(dailyData, d => d.Date);
    dailyDataGroupedByDay =  _.groupBy(dailyData, d => d.Day);
    dailyDataGroupedByMonth =  _.groupBy(dailyData, d => d.Month);
    dailyDataGroupedByYear =  _.groupBy(dailyData, d => d.Year);
    
    d3.csv("./sensors.csv", function (error, data) {
        sensorData = data;
        drawMap(sensorData);
        updateMap("2017-01-01");
        d3.select("#map").selectAll("circle").filter(d => d.Sensor == "State Library").style("fill", "yellow");
        drawBar("State Library", global_mode);
    })
})

// $(document).ready(function()
// {
//     $("#circleslider3").tinycircleslider({
//         dotsSnap : true
//     ,   radius   : 170
//     ,   dotsHide : false
//     });

//     $("#circleslider3").find("a").fancybox();

// });

