$(document).ready(function() {


    $.getJSON("../assets/data/us.json", function(us) {
        createMap.init(us);

    });


});

var createMap = {
    init: function(us){

    var margin = {top:80, right: 0, bottom: 30, left: 0},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var svg = d3.selectAll(".national-map").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)


    var projection = d3.geoAlbersUsa()
      .scale(800)
      // .center([-100,31])
      .translate([width / 2, height / 2])

    var path = d3.geoPath()
      .projection(projection);

    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter()
      .append("path")
      .style("opacity", 0.9)
      .attr("stroke-width", 0)
      .attr("stroke", "black")
      .attr("d", path)
      .attr("class", "county")

    svg.append("path")
      .attr("stroke-width", 0.8)
      .attr("stroke", "white") 
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))

    d3.select("#senate-national").selectAll(".county")
      .each(getRandomColor)

    d3.select("#house-naitonal").selectAll(".county")
      .each(getRandomColor)


 


  }
}

function getRandomColor() {
  
  d3.select(this)
    .style("fill", function(){
      var random_num = Math.random()*10;
      if (Math.floor(random_num) % 3 == 0){
        return "#4482ba"
      }else{
        return "#dc4a4d"  
      }
    })

}
