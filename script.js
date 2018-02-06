var map = L.map('map').setView([-37.81, 144.95], 14);
mapLink = 
'<a href="http://www.arcgis.com">Stamen Design</a>';
L.tileLayer(
    'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '&copy; ' + mapLink,
    maxZoom: 18,
}).addTo(map);

/* Initialize the SVG layer */
map._initPathRoot()    

/* We simply pick up the SVG from the map object */
var svg = d3.select("#map").select("svg"),
g = svg.append("g");

console.log(collection)

/* Add a LatLng object to each item in the dataset */
collection.objects.forEach(function(d) {
    d.LatLng = new L.LatLng(d.circle.coordinates[0],
        d.circle.coordinates[1])
    })
    
    var feature = g.selectAll("circle")
    .data(collection.objects)
    .enter().append("circle")
    .style("stroke", "black")  
    .style("opacity", 1) 
    .style("fill", "green")
    .attr("r", 5)
    .on("mouseover", function(d) {console.log("over")});
    
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
