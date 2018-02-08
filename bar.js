drawBar = function(inputData) {
  console.log(inputData);

  var  bardiv = d3.select("#barplot");
  console.log(bardiv);
  var  svg = bardiv.append("svg");

  var  margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
       width = +svg.attr("width") - margin.left - margin.left,
       height = +svg.attr("height") - margin.top - margin.bottom;

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  max_y =  d3.max(inputData, function(d){ return d.avg_count;});
  x.domain(inputData.map(function(d) { return d.hour; }));
  y.domain([0, max_y]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))

  g.append("text")
      .attr("class", "x label")  
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.7em")
      .style("text-anchor", "end")
      .text("Count");      


  g.selectAll(".bar")
    .data(inputData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.hour); })
      .attr("y", function(d) { return y(d.avg_count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.avg_count); });

}
// svg.on('click', function() {
//         selections = ["Melbourne Central", "Alfred Place", "Flinders Street Station Underpass"];
//         index = Math.floor(Math.random() * 3);
//         console.log(selections[index]);
//         filter_by_sensor(selections[index]);
//         d3.selectAll("g > *").remove();

//     });

