// POST routes /api/friends - this handles incoming survey results used to handle compatibility logic
//Load friend.js
let friendList = require('../data/friend.js');

module.exports = function(app){
  // GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

  app.post('/api/friends', function(req,res){
    // get new friend's scores to compare with friends in friendList array
    let newFriendScores = req.body.scores;
    let scoresArray = [];
    let friendCount = 0;
    let bestMatch = 0;

    //runs through all current friends in list
    for(let i=0; i<friendList.length; i++){
      let scoresDiff = 0;
      //run through scores to compare friends
      for(let j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(let k=0; k<scoresArray.length; k++){
      if(scoresArray[k] <= scoresArray[bestMatch]){
        bestMatch = k;
      }
    }

    //return bestMatch data
    let bff = friendList[bestMatch];
    res.json(bff);

    //put new submission into friendsList array
    friendList.push(req.body);
    friendList = [];
  });
};