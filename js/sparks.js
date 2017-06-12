$(document).ready(function() {

    $.getJSON("../assets/data/congress_info_115.json", function(data) {
        createSparkContainer.init(data);
        createSparks.init()

        // console.log(data)
    });


});



var createSparkContainer = {
    init: function(data){

        // var years = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

        var sparksSenateContainer = d3.select("#senate-sparks");

        var senateSparks = sparksSenateContainer.selectAll(".senate-sparks-charts")
            .data(data.filter(function(d){
                // console.log(d)
                return d["state"] == "NY"  
            }))
            .enter()
            .append("div")
            .attr("class", "senate-sparks-charts")

        var congress_div = senateSparks.append("div")
            .attr("class", function(d){
                if(d["party"] == "R" ){
                    return "congress_photo_div" + " " + "r-img" + " " + "round-border"
                }else{
                     return "congress_photo_div" + " " + "d-img" + " " + "round-border"
                }
            }) 
            .style("float", "left")


        congress_div.append("img")
            .attr("src",function(d) {  
                return 'https://theunitedstates.io/images/congress/225x275/' + d["id"] +'.jpg'
            })
            .attr("class", "g-congress-img round-border")
            .style("float", "left")

        var congress_names_div =  senateSparks.append("div")
        

        congress_names_div.append("p")
            .text(function(d) {  
                if(d["middle_name"]){
                    return d["first_name"] + " " + d["middle_name"]+ " "+d["last_name"] 
                }else{
                    return d["first_name"] + " " + d["last_name"] 
                }
            })
            .attr("class", "sparks-congress-name")

        var congress_chart_container =  senateSparks.append("div")
            // .attr("class", "congress_chart_container")
            .attr("class", function(d){
                if(d["party"] == "R" ){
                    return "congress_chart_container" + " " + "r-chart"
                }else{
                     return "congress_chart_container" + " " + "d-chart"
                }
            })



    }
}


var startDate = new Date('2004-1-1');
var endDate = new Date('2017-5-13');
var date = [];
var value = [];
var valueArray = [];
var dateArray = [];


var now = new Date();
// var dateArray = [];

var dateGenerator = function(){
    for (var d = new Date(2004, 0, 1); d <= now; d.setDate(d.getDate() + 7)) {
        var thisdate = d
        dateArray.push(new Date(d));
    // console.log(new Date(d))
    }

    return dateArray
}

var valueGenerator = function(){
            for(var i = startDate; i < endDate; startDate.setDate(startDate.getDate() + 7)) {
                var value =  Math.round(Math.random()*100) 
                valueArray.push(value)
            }
            // var test = value.slice(0,-1);
            // valueArray.push(test)

            return valueArray
        }





valueGenerator()
dateGenerator()


var xy = [];
var createXYdata = function(){
    for(var i=0;i<dateArray.length;i++){
        xy.push({date:dateArray[i],value:valueArray[i]});
    }

}
createXYdata()

console.log(xy)


var createSparks = {
    init: function(){

        // helper and other stuff
        var margin = {top: 5, right: 10, bottom: 5, left: 10},
            width = 1000 - margin.left - margin.right,
            height = 50 - margin.top - margin.bottom
            

        var sticky_margin = {top: 0, right: 10, bottom: 0, left: 10},
            sticky_axis_height = 40 - sticky_margin.top - sticky_margin.bottom;

        var x = d3.scaleTime()
                .range([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

     
        var parseTime = d3.timeParse("%c");

        xy.forEach(function(d) {
          d.Year = parseTime(d.date);
          // d.Value = +d.Value;
        });


       
        x.domain(d3.extent(xy, function(d,i) { return d.date }));

        y.domain([0, d3.max(xy, function(d, i){ return d.value})]); 



        var area = d3.area()
            .x(function(d, i) { return x(d.date); })
            .y0(height)
            .y1(function(d, i) { return y(d.value); });



        d3.selectAll(".congress_chart_container")
            .each(renderSparks)

        var g = d3.select("#sticky-x")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", sticky_axis_height + sticky_margin.top + sticky_margin.bottom)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + sticky_margin.top + ")")

        var stickyXaix = g.append("g")
          .attr("transform", "translate(0," + sticky_axis_height + ")")
          .call(d3.axisTop(x).ticks(20))
        // .orient("top");
          .select(".domain")
          .remove();




        // console.log(x)

        function renderSparks(){




            var g = d3.select(this)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append('g')
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            var sparksXaxis = g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).ticks(20).tickSize(-(height+margin.top+margin.bottom), 0, 0))
              .classed("sparks-x-axis", true)
            // .orient("top");
              // .select(".domain")n
              .selectAll("text")
              .remove();

              



        
             // d3.select(".sparks-x-axis").selectAll("text").remove()

            g.append("path")
              .datum(xy)
              // .attr("class","area-line")  
              // .attr("fill", "steelblue")
              .attr("d", area);

            d3.select(window).on("resize", resize);



            // function resize(){

            //     var $w;
            //     var getChartWidth = function(){
            //         if(window.innerWidth < 1200){
            //             $w = 1000 - margin.left - margin.right
            //         }else if (window.innerWidth < 1000){
            //             $w = 300 - margin.left - margin.right
            //         }
            //     }
            //     getChartWidth()
            //     // d3.selectAll(".congress_chart_container").selectAll("svg").attr("width", $w + margin.left + margin.right)

            //     g.attr("width", $w + margin.left + margin.right)
            //     sparksXaxis.attr("width", $w + margin.left + margin.right).call(d3.axisBottom(x).ticks(20).tickSize(-(height+margin.top+margin.bottom), 0, 0))
            //     x.rangeRound([0, $w]);


            // }




             

        }


     

       


    }
}

// function resize(){

//     d3.selectAll(".congress_chart_container")
//         .each(resizeSparks)

//     function resizeSparks(){
//         var $w = $(window).innerWidth()


//         var x = d3.scaleTime()
//                 .rangeRound([0, $w]);

//         var area = d3.area()
//                     .x(function(d) { return x(d.date); })
//                     .y1(function(d) { return y(d.value); });

//          // var area = d3.area()
//          //    .x(function(d, i) { return x(d.date); })
//          //    .y0(height)
//          //    .y1(function(d, i) { return y(d.value); });

//         // area.y0(y(0));

//         d3.selectAll("path")
//           .attr("d", area);

//     }



// }

// window.addEventListener("resize", resize);

