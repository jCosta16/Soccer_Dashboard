
var sorted_league
var max_player_position
var target_team
var team_list
var league_list
// function buildMetadata(sample) {
//   team_list = []
//     d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {
//       for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
//         if (soccerdata.Leagues[i].league_name == sample) {
//           sorted_league = (soccerdata.Leagues[i]);
//         };  
//         team_list = []
//         if (soccerdata.Leagues[i].league_name == sample){
//           var sorted_clubs = soccerdata.Leagues[i].clubs;
//           // console.log(sorted_clubs)
//           for (var i=0; i < sorted_clubs.length;++i )
//             team_list.push(sorted_clubs[i].club)
        
//         };

//         var team_selector = d3.select("#selTeam");
      
//         team_list = (Array.from(new Set(team_list))).sort()
//         team_list.forEach((team) => {
//           team_selector
//             .append("option")
//             .text(team)
//             .property("value", team);
//         });
//         console.log(team_list)
//       }; 
//       console.log(team_list)
//     });  
//   // return console.log(team_list)



// };

function buildTeam(sample) {
  var team_selector = d3.select("#selTeam")

  // d3.json("../dict_soccer_data.json").then(function(soccerdata) {
  d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {
    team_list = []

    for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
      if (soccerdata.Leagues[i].league_name == sample){
        var sorted_clubs = soccerdata.Leagues[i].clubs;
        for (var i=0; i < sorted_clubs.length;++i )
          team_list.push([sorted_clubs[i].club,sorted_clubs[i].team_ID])
          // console.log(team_list)
      }
      team_list = (Array.from(new Set(team_list))).sort()

      team_selector.text("");
      team_list.forEach((team) => {

      team_selector
        .append("option")
        .text(team[0])
        .property("value", team[0]);
  
      });

    };
    // console.log(team_list)
    return team_list
  });
}


function init() {
  // Grab a reference to the dropdown select element
  // var firstSample
  var league_selector = d3.select("#selLeague");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/dict_soccer_data.json").then((data) => {
    var league_list = []
    for (var i = 0; i < data.Leagues.length; i++) {
      // console.log(data.Leagues)
      var sorted_league = data.Leagues[i].league_name
        if (!(sorted_league in league_list)) {
          league_list.push(sorted_league)
          
        }
    }
    league_list = (Array.from(new Set(league_list))).sort()
    league_list.forEach((league) => {
      league_selector
        .append("option")
        .text(league)
        .property("value", league);
    });

    var team_list = []
    for (var i=0, len = data.Leagues.length; i < len; i++) {
      if (data.Leagues[i].league_name == league_list[0]){
        var sorted_clubs = data.Leagues[i].clubs;
        for (var i=0; i < sorted_clubs.length;++i )
        team_list.push(sorted_clubs[i].club)
          // console.log(team_list)
      }
    };
    team_list = (Array.from(new Set(team_list))).sort()
    const firstSample = league_list[0];
    const firstTeamSample = team_list[0]

    buildTeam(firstSample)
    console.log(firstTeamSample)
    // buildMetadata(firstSample);
    teamsSelect(firstTeamSample);
    // buildMap(firstSample);
    // buildPlotly(firstSample);
    // buildTeam(team_list[0])
    // return team_list, firstSample

  });

}

function optionChange(newSample) {
  var team_list = []
  d3.json("./static/data/dict_soccer_data.json").then((data) => {

  for (var i=0, len = data.Leagues.length; i < len; i++) {
    if (data.Leagues[i].league_name == newSample){
      var sorted_clubs = data.Leagues[i].clubs;
      for (var i=0; i < sorted_clubs.length;++i )
      team_list.push(sorted_clubs[i].club)
        // console.log(team_list)
    }
  };
  team_list = (Array.from(new Set(team_list))).sort()
  const firstTeamSample = team_list[0]

  // Fetch new data each time a new sample is selected
  // buildMetadata(newSample);
  // buildPosition(newSample);
  buildTeam(newSample)
  teamsSelect(firstTeamSample);

  // updateMap(newSample);  
  // buildPlotly(newSample);
})
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildMetadata(newSample);
  // buildPosition(newSample);
  // buildTeam(newSample)
  teamsSelect(newSample);

  // updateMap(newSample);  
  // buildPlotly(newSample);
};

// Initialize the dashboard
init();