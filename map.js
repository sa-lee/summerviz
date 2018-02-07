function drawMap(inputData) {
    var map = L.map('map', {zoomControl:false}).setView([-37.81, 144.95], 14);
    mapLink =
    '<a href="http://www.arcgis.com">Stamen Design</a>';
    L.tileLayer(
        'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: '&copy; ' + mapLink,
        minZoom: 10,
        maxZoom: 16
    }).addTo(map);

    //change cursor to crosshair style in ID 'map'
    document.getElementById('map').style.cursor = 'crosshair'
    //document.getElementById('map').style.cursor = '' //(reset)

    L.control.scale().addTo(map).setPosition('bottomright')

    /* Initialize the SVG layer */
    map._initPathRoot()

    /* We simply pick up the SVG from the map object */
    var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

    /* Initialize tooltip */
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.Sensor + "<br />" + "(" + d.Longitude + ", " + d.Latitude + ")"; });

    /* Invoke the tip in the context of your visualization */
    svg.call(tip)

    /* Add a LatLng object to each item in the dataset */
    inputData.forEach(function(d) {
        d.LatLng = new L.LatLng(
            d.Latitude,
            d.Longitude
        )
    })

    // draw points
    var feature = g.selectAll("circle")
        .data(inputData)
        .enter().append("circle")
        .style("stroke", "black")
        .style("opacity", 1)
        .style("fill", "green")
        .attr("r", 5)
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

