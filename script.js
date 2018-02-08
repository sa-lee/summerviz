var dailyData;
var sensorData;

d3.csv("./counts_all_2017.csv", function (error, data) {
    dailyData = data;
    dailyData = _.filter(dailyData, d => { return d.Count != "NA" });
    d3.csv("./sensors.csv", function (error, data) {
        sensorData = data;
        drawMap(sensorData);
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

