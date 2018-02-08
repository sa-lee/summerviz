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
        currentData = query_sensor(dailyDataGroupedByYear[year], sensor_name);
        currentData = groupBySum(currentData, "Month")
    }

    var svg = d3.select("#barplot").select("svg");
    // margins for bar
    var margin = {top: 20, right: 20, bottom: 50, left: 80},
        width = +svg.attr("width") - margin.left - margin.left,
        height = +svg.attr("height") - margin.top - margin.bottom;

    // x, y
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05),
        y = d3.scale.linear().range([height, 0]).nice(),
        reds = d3.scaleOrdinal(d3.schemeReds[7]).domain(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

    // axes 
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (currentData.length == 0) {
        var textSel = g.append("text")
        textSel.html("Sensor Down")
            .attr("class", "sensor-down")
            .attr("x", (width / 2) - margin.left)
            .attr("y", 250)
            .attr("font-size", "2em");

        g.append("text")
            .attr("class", "sensor-down")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 3))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(sensor_name);
        return;
    } else {
        g.selectAll("text.sensor-down").remove()
    }
    
    
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
    
    if (mode == "daily") {
        // text label for the x axis
        g.append("text")             
            .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Hour (24h)");
        g.append("text")
            .attr("class", "x label")  
            .attr("transform", "rotate(-90)")
            .attr("x", -250)
            .attr("y", -65)
            .attr("dy", "0.7em")
            .style("text-anchor", "bottom")
            .text("Count")
    } else {
        g.append("text")
            .attr("class", "x label")  
            .attr("transform", "rotate(-90)")
            .attr("x", -250)
            .attr("y", -65)
            .attr("dy", "0.7em")
            .style("text-anchor", "bottom")
            .text("Total Count")
            if (mode == "monthly") {
                g.append("text")             
                    .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
                    .style("text-anchor", "middle")
                    .text("Day");
            } else if (mode == "yearly") {
                g.append("text")             
                    .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
                    .style("text-anchor", "middle")
                    .text("Month");
            }
    }


    g.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 3))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(sensor_name);

    var bars = g.selectAll(".bar")
        .data(currentData)
        .enter().append("rect")

    bars.attr("class", "bar")
        .attr("x", xVal)
        .attr("y", function(d) { return y(d.Count); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.Count); })

    if (mode != "monthly") {
        bars.style("fill", d => "red");
    } else {
        bars.style("fill", d => reds(d.DayOfWeek))
    }
}
