var soccerdata
function multiplemax(test_array) { 
  let arr = Object.values(test_array);
  let max = Math.max(...arr)
  let listtest =[]
  for (let [key, value] of Object.entries(test_array)) {
    if(value == max){
      listtest.push(key)
    }
  }
  return [listtest, max];
};
// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
var svg = d3.select("#court-svg")
  .append("svg")
  .attr("viewBox","0 0 450 600")
  .attr("perserveAspectRatio","xMinYMid")
  .attr("height", "100%")
  .attr("width", "100%");

// drawing the court
var chartGroup = svg.append("g");

chartGroup.append('image')
.attr('link:href', './static/images/Campofutebol.png')
.attr('width', '100%')
.attr('height', '100%');

chartGroup.append("image")
  .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
  .classed("court basket goalkeeper", true)
  //.attr("r", 20)
  .attr("x", 205)
  .attr("y", 520)
  .attr('height', 50); 

        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket LE", true)
        .attr('height', 50)
        .attr("x", 55)
        .attr("y", 435);
//
        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket ZE", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 435);
        
        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket ZD", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 435);

        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket LD", true)
        .attr('height', 50)
        .attr("x", 360)
        .attr("y", 435);




        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket ME", true)
        .attr('height', 50)
        .attr("x", 55)
        .attr("y", 275);
        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket MCE", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 275);    

        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket MCD", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 275);
        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket MD", true)
        .attr('height', 50)
        .attr("x", 370)
        .attr("y", 275);  

        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket ATTE", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 110);

        chartGroup.append("image")
        .attr('link:href', 'https://tmssl.akamaized.net/images/wappen/normal/51663.png')
        .classed("court basket ATTD", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 110);    
            
var courtGroup = chartGroup.selectAll(".court");

// Drawing the positions


var positions = [
  {"Goalkeeper":{"loc":{"x": 210, "y": 540}}},
  {"Defenders": { 1 :{"loc":{"x": 60, "y": 455}}, 
                  2: {"loc":{"x": 165, "y": 455}},
                  3: {"loc":{"x": 265, "y": 455}},
                  4: {"loc":{"x": 365, "y": 455}}}},
  {"Midfielders": {1:{"loc":{"x": 60, "y": 295}},
                   2:{"loc":{"x": 165, "y": 295}},
                   3:{"loc":{"x": 265, "y": 295}},
                   4:{"loc":{"x": 365, "y": 295}}}},
  {"Forwards":{ 1: {"loc":{"x": 165, "y": 130}},
                2: {"loc":{"x": 265, "y": 130}}}},
];
console.log(positions)

var tooltip = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);

var positionGroup

var toolTip = d3.select("body")
.append("div")
.classed("tooltip", true);

// inicio OK!!!!!

function buildPosition(sample) {
  d3.json("./static/data/data1.json").then(function(soccerdata) {
    var sorted_league = [];
    if (sample == "All Leagues"){
      sorted_league = soccerdata;
    }
    else{
      for (var i=0, len = soccerdata.length; i < len; i++) {
        if (soccerdata[i].league_name == sample) {
          sorted_league.push(soccerdata[i]);
        };
      };   
    }; 
    court_data = sorted_league
    console.log(court_data)
 
  // fim OK


    // var position_drafted = _.countBy(sorted_year, function (player) {
    //   return player.position;
    // });
    // var top_position = multiplemax(position_drafted);
  
  
    // chartGroup.selectAll(".position").remove()
    var positionGroup = chartGroup.selectAll(".position");
    positionGroup.remove();

    for (var i=0, len = positions.length; i < len; i++) {
      var pos = positions[i].position;
      var tpos = positions[i]
      for (let [key, value] of Object.entries(pos)) {
        
        if(top_position[0].includes(value)) {
              
        chartGroup.append("circle")
        .attr("class", "position pSelect", true) 
        .attr("id", `${value}`, true)
        .attr("r", 25)
        .attr("cx", positions[i].loc.x)
        .attr("cy", positions[i].loc.y)
        .on("mouseover", function(d) {	
          toolTip.style("opacity", .9)
          .attr("class", "tooltip pSelect");		
              toolTip	.html(`<strong>${value}</strong><hr>Players drafted:<br>${top_position[1]}`)	
              .style("left", (d3.event.pageX) + "px")		
              .style("top", (d3.event.pageY - 28) + "px");	
          })					
         .on("mouseout", function(d) {		
        toolTip.transition()		
              .duration(500)		
              .style("opacity", 0);	
       });

        chartGroup
        .append("text")
        .attr("class", "position pText pSelect")
        .attr("x", positions[i].loc.x - 14 )
        .attr("y", positions[i].loc.y - 12)
        .attr("dy", "1em")
        .text(`${key}`);

        
        }
        else{
          chartGroup.append("circle")
          .attr("class", "position", true) 
          .attr("id", `${value}`, true)
          .attr("r", 20)
          .attr("cx", positions[i].loc.x)
          .attr("cy", positions[i].loc.y)
          .on("mouseover", function(d) {	
            toolTip.style("opacity", .9)
            .attr("class", "tooltip");		
                toolTip	.html(`<strong>${value}</strong><hr>Players drafted:<br>${position_drafted[value]}`)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
           .on("mouseout", function(d) {		
          toolTip.transition()		
                .duration(500)		
                .style("opacity", 0);	
          });;

          chartGroup
          .append("text")
          .attr("class", "pText position")
          .attr("x", positions[i].loc.x - 10 )
          .attr("y", positions[i].loc.y - 10)
          .attr("dy", "1em")
          .text(`${key}`);

        };
        
        var positionGroup = chartGroup.selectAll(".position");
      };
    };
    
    
    
  }).catch(function(error) {
    console.log(error);
  });
};

