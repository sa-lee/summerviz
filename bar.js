drawBar = function(sensor_name) {
  
  // get the selected date
  var slider = document.getElementById("myRange");
  var date = dateToYMD(dateFromDay(2017, slider.value));

  var currentData = query_sensor(dailyDataGroupedByDate[date], sensor_name);

  
  console.log(currentData);

  var  svg = d3.select("#barplot").select("svg");
  console.log(svg);
  // margins for bar
  var  margin = {top: 20, right: 20, bottom: 40, left: 40},
       width = +svg.attr("width") - margin.left - margin.left,
       height = +svg.attr("height") - margin.top - margin.bottom;

  // x, y
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05),
      y = d3.scale.linear().range([height, 0]).nice();

  // axes 


  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  max_y =  d3.max(currentData, function(d){ return +d.Count;});

  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
  var xAxis = d3.svg.axis().scale(x).orient("bottom");

  x.domain(currentData.map(function(d) { return d.Time; }));
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
      .attr("y", 6)
      .attr("dy", "0.7em")
      .style("text-anchor", "bottom")
      .text("Count")


  g.selectAll(".bar")
    .data(currentData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Time); })
      .attr("y", function(d) { return y(d.Count); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.Count); });
}



