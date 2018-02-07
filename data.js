var dailyData;
var sensorData;

d3.csv("./counts_all_2017.csv", function (error, data) {
    dailyData = data;
})

d3.csv("./sensors.csv", function (error, data) {
    sensorData = data;
})

