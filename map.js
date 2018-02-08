function drawMap(inputData) {
    var map = L.map('map', {zoomControl:false}).setView([-37.81, 144.957], 14);
    mapLink =
    '<a href="http://www.arcgis.com">Stamen Design</a>';
    L.tileLayer(
        'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: '&copy; ' + mapLink,
        minZoom: 14,
        maxZoom: 16
    }).addTo(map);

    L.control.scale().addTo(map).setPosition('bottomright')

    /* Initialize the SVG layer */
    map._initPathRoot()

    /* We simply pick up the SVG from the map object */
    var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

    /* Initialize tooltip */
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
        var lon = precisionRound(d.Longitude, 2);
        var lat = precisionRound(d.Latitude, 2);
        return d.Sensor + "<br />" + numberWithCommas(d.count) + " people"; 
    });

    /* Invoke the tip in the context of your visualization */
    svg.call(tip)

    /* Add a LatLng object to each item in the dataset */
    inputData.forEach(function(d) {
        d.LatLng = new L.LatLng(
            d.Latitude,
            d.Longitude
        )
        d.count = query_year(query_sensor(dailyData, d.Sensor), "2017").map(d => +d.Count).reduce((x, y) => x + y);
    })

    // create a radius scale
    var rScale = d3.scale.linear().domain(d3.extent(inputData.map(d => d.count))).range([5, 15]);

    // draw points
    var feature = g.selectAll("circle")
        .data(inputData)
        .enter().append("circle")
        .style("opacity", 0.8)
        .style("stroke", "black")
        .style("fill", "red")
        .attr("r", d => rScale(d.count))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide); 

    map.on("viewreset", update);
    update();

    function update() {
        feature.attr("transform",
            function(d) {
                return "translate("+
                map.latLngToLayerPoint(d.LatLng).x +","+
                map.latLngToLayerPoint(d.LatLng).y +")";
            }
        )
    }

}

