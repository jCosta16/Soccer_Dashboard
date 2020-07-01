var soccerdata
function clear_field(){
  d3.selectAll("svg > *").remove();
 }
 
   // Append the SVG wrapper to the page, set its height and width, and create a variable which references it
   var svg = d3.select("#stadium_svg")
   .append("svg")
   .attr("viewBox","0 0 450 600")
   .attr("perserveAspectRatio","xMinYMid")
   .attr("height", "100%")
   .attr("width", "100%");


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
 

  var field_positions = []
  for (var i=0, len = soccerdata.length; i < len; i++) {
    var position = soccerdata[i].field_position
      if (!(position in field_positions)) {
        field_positions.push(position)
        }
  }
  field_positions = (Array.from(new Set(field_positions)))
  console.log(field_positions)
  var max_line_up = []

  field_positions.forEach((position) => {
    var selected_position = []
    var sorted_position = []
    for (var i=0, len = sorted_league.length; i < len; i++) {
      if (position == sorted_league[i].field_position) {
        selected_position.push(sorted_league[i])
       }
    }
    sorted_position = selected_position.sort((a,b) => (a.market_value > b.market_value) ? -1:1).slice(0,10);
    switch(position) {
      case "GLK":
        max_line_up.push(sorted_position[0])
        break;
      case "DEF":
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
        max_line_up.push(sorted_position[2])
        max_line_up.push(sorted_position[3])
        break;
      case "MID":
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
        max_line_up.push(sorted_position[2])
        max_line_up.push(sorted_position[3])
        break;
      default:
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
        }
  });
  
  console.log(max_line_up);
  
  
  
  // fim OK


  // drawing the court
  var chartGroup = svg.append("g");

    chartGroup.append('image')
    .attr('link:href', './static/images/Campofutebol.png')
    .attr('width', '100%')
    .attr('height', '100%')
    .classed("court");

    var positionGroup = chartGroup.selectAll(".position");
    positionGroup.remove();

    chartGroup.append("image")
      .attr('link:href', max_line_up[0].logo_img)
      .classed("court basket goalkeeper", true)
      //.attr("r", 20)
      .attr("x", 205)
      .attr("y", 520)
      .attr('height', 50); 

        chartGroup.append("image")
        .attr('link:href', max_line_up[1].logo_img)
        .classed("court basket LE", true)
        .attr('height', 50)
        .attr("x", 55)
        .attr("y", 435);

        chartGroup.append("image")
        .attr('link:href', max_line_up[2].logo_img)
        .classed("court basket ZE", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 435);
        
        chartGroup.append("image")
        .attr('link:href', max_line_up[3].logo_img)
        .classed("court basket ZD", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 435);

        chartGroup.append("image")
        .attr('link:href', max_line_up[4].logo_img)
        .classed("court basket LD", true)
        .attr('height', 50)
        .attr("x", 360)
        .attr("y", 435);

        chartGroup.append("image")
        .attr('link:href', max_line_up[5].logo_img)
        .classed("court basket ME", true)
        .attr('height', 50)
        .attr("x", 55)
        .attr("y", 275);
        chartGroup.append("image")
        .attr('link:href', max_line_up[6].logo_img)
        .classed("court basket MCE", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 275);    

        chartGroup.append("image")
        .attr('link:href', max_line_up[7].logo_img)
        .classed("court basket MCD", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 275);
        chartGroup.append("image")
        .attr('link:href', max_line_up[8].logo_img)
        .classed("court basket MD", true)
        .attr('height', 50)
        .attr("x", 370)
        .attr("y", 275);  

        chartGroup.append("image")
        .attr('link:href', max_line_up[9].logo_img)
        .classed("court basket ATTE", true)
        .attr('height', 50)
        .attr("x", 260)
        .attr("y", 110);

        chartGroup.append("image")
        .attr('link:href', max_line_up[10].logo_img)
        .classed("court basket ATTD", true)
        .attr('height', 50)
        .attr("x", 160)
        .attr("y", 110);    
            
    var courtGroup = chartGroup.selectAll(".court");

    // Drawing the positions


    var img_positions = [
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
    
  }).catch(function(error) {
    console.log(error);
  });
};



