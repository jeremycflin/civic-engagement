

$(document).ready(function() {
    var chambers = ["house", "senate"]
    createContainers.init(chambers);

    $.getJSON("../assets/data/us.json", function(us) {
        createMaps.init(us);

    });



});


var createContainers = {
    init: function(chambers){
     
        var countyMapsContainer = d3.select("#county-maps");

        var countyMaps = countyMapsContainer.selectAll(".county-map")
            .data(chambers)
            .enter()
            .append("div")
            .attr("class", "county-map")
            .attr("id", function(d){
                return d + "-county-map"
            })

    }
}

var createMaps = {
    init: function(us){


        var margin = {top:0, right: 0, bottom: 0, left: 0},
            width = 290 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;


        var projection = d3.geoAlbers() 
          .translate([width / 2, height / 2]) 
          .scale(3000) 
          .rotate([74.0059, 0]) 
          .center([0, 40.7128]); 


        var path = d3.geoPath()
            .projection(projection);

        var container = d3.selectAll(".county-map")

        var g = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "water")

        g.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            // .data(topojson.feature(us, us.objects.counties).features.filter(function(d){
            //     return d.id.slice(0, 2) == 48
            // }))
            .enter()
            .append("path")
            .style("opacity", 0.9)
            .attr("stroke-width", 0)
            .attr("stroke", "black")
            .attr("d", path)
            .attr("class", "county")

         g.append("path")
            .attr("stroke-width", 0.7)
            .attr("stroke", "white") 
            .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))

        d3.select("#house-county-map").selectAll(".county")
            .each(getRandomColor)

        d3.select("#senate-county-map").selectAll(".county")
            .each(getRandomColor)

    }
}

