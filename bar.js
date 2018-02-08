drawBar = function(sensor_name, mode) {
    global_sensor = sensor_name;
    // get the selected date
    var slider = document.getElementById("myRange");
    var date = dateToYMD(dateFromDay(2017, slider.value));

    var currentData;

    if (mode == "daily") {
        currentData = query_sensor(dailyDataGroupedByDate[date], sensor_name);
    } else if (mode == "monthly") {
        var month = get_month(date);
        currentData = query_sensor(dailyDataGroupedByMonth[month], sensor_name);
        currentData = groupBySum(currentData, "Day")
    } else if (mode == "yearly") {
        var year = get_year(date);
        console.log(year)
        currentData = query_sensor(dailyDataGroupedByYear[year], sensor_name);
        currentData = groupBySum(currentData, "Month")
    }

    var svg = d3.select("#barplot").select("svg");
    if (currentData.length == 0) {
        var textSel = svg.append("text")
        textSel.html("Sensor Down")
            .attr("class", "sensor-down")
            .attr("x", 250)
            .attr("y", 250)
            .attr("font-size", "2em");
        return;
    } else {
        svg.selectAll("text.sensor-down").remove()
    }

    // margins for bar
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = +svg.attr("width") - margin.left - margin.left,
        height = +svg.attr("height") - margin.top - margin.bottom;
    
    // x, y
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05),
        y = d3.scale.linear().range([height, 0]).nice();
    
    // axes 
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    max_y =  d3.max(currentData, function(d) { return +d.Count; });
    
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    
    if (mode == "daily") {
        x.domain(currentData.map(function(d) { return d.Time; }));
        var xVal = function(d) { return x(d.Time); }
    } else if (mode == "monthly") {
        x.domain(currentData.map(function(d) { return d.Day; }));
        var xVal = function(d) { return x(d.Day); }
    } else if (mode == "yearly") {
        x.domain(currentData.map(function(d) { return d.Month; }));
        var xVal = function(d) { return x(d.Month); }
    }
    y.domain([0, max_y*1.2]);
    
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    
    g.append("text")
        .attr("class", "x label")  
        .attr("transform", "rotate(-90)")
        .attr("x", -30)
        .attr("y", 6)
        .attr("dy", "0.7em")
        .style("text-anchor", "bottom")
        .text("Count")
    
    g.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(sensor_name);

    g.selectAll(".bar")
        .data(currentData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", xVal)
        .attr("y", function(d) { return y(d.Count); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.Count); });
}
