var express = require('express');
var session = require('express-session')
var passport = require('passport');
var GitHubApi = require("github");
var GitHubStrategy = require('passport-github').Strategy;


var port = 8888;
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'thisstring@this55555'}));
app.use(passport.initialize());
app.use(passport.session());

var github = new GitHubApi({
    // required
    version: "3.0.0",
   
});


passport.use(new GitHubStrategy({
    clientID: 'a46a2332700d8c565d5d',
    clientSecret: 'e4af68c30c1eb469fc197403857b1acec863f434',
    callbackURL: "http://localhost:8888/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   return done(null, profile) 
  }
));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
	passport.authenticate('github', {
		successRedirect: '/#/home', // /#/home, /api/github/following, it works now
		failureRedirect: '/'
	}));

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}





app.get('/api/github/following', requireAuth, function(req, res) {
	 github.user.getFollowingFromUser({
    user: req.user.username}, function(err, response) {
    console.log(JSON.stringify(response));
})
	 res.send.json.stringify(res)
});



app.listen(port, function() {
	console.log('this is port ' + port)
})