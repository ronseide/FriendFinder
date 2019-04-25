// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var surveyData = require("../data/friends");

// var waitListData = require("../data/waitinglistData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    // console.log(surveyData.scores[0]);
    // console.log(surveyData.scores[1]);
    // console.log(surveyData.scores[2]);

    res.json(surveyData);
  });

//   app.get("/api/waitlist", function(req, res) {
//     res.json(waitListData);
//   });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // if (tableData.length < 5) {
      var newUser = req.body;
      var userScores = newUser.scores;
      var bestMatch = {
        name: "",
        photo: "",
        totalDifference: 999
      }
      for (var i = 0; i < surveyData.length; i++) {
        var difference = 0;
        console.log(surveyData[i].name);
        for (var j = 0; j < surveyData[i].scores[j]; j++) {
          difference += Math.abs(parseInt(userScores[j]) - parseInt(surveyData[i].scores[j]));
        }
        if (difference <= bestMatch.totalDifference) {
          bestMatch.name = surveyData[i].name;
          bestMatch.photo = surveyData[i].photo;
          bestMatch.scores = surveyData[i].scores;
        }
      }
      surveyData.push(newUser);
      res.json(bestMatch);
      console.log("bestMatch", bestMatch);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function(req, res) {
  //   // Empty out the arrays of data
  //   friends.length = [];
  //   // waitListData.length = [];

  //   res.json({ ok: true });
  // });
};
