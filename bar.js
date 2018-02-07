

filter_by_sensor = function(sensor_name) {
  d3.tsv("average_hourly_counts.tsv", function(d) {
  d.avg_count= +d.avg_count;
  return d;
  }, 
  function(error, data) {
  if (error) throw error;

  data = data.filter(function(d) {return d.sensor == sensor_name;});
  console.log(data);
  max_y =  d3.max(data, function(d){ return d.avg_count;});
  x.domain(data.map(function(d) { return d.hour; }));
  y.domain([0, max_y]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.hour); })
      .attr("y", function(d) { return y(d.avg_count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.avg_count); });
});
}

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.left,
    height = +svg.attr("height") - margin.top - margin.bottom;


var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.on('click', function() {
        selections = ["Melbourne Central", "Alfred Place", "Flinders Street Station Underpass"];
        index = Math.floor(Math.random() * 3);
        console.log(selections[index]);
        filter_by_sensor(selections[index]);
        d3.selectAll("g > *").remove();

    });


