var surveyData = require("../data/friends");
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {

    res.json(surveyData);
  });
  app.post("/api/friends", function(req, res) {
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
          bestMatch.totalDifference = difference;
        }
      }
      surveyData.push(newUser);
      res.json(bestMatch);
      console.log("bestMatch", bestMatch);
  });
  // app.post("/api/clear", function(req, res) {
  //   // Empty out the arrays of data
  //   friends.length = [];
  //   // waitListData.length = [];

  //   res.json({ ok: true });
  // });
};
