// To get started, you’re first going to connect to the registration endpoint. It lives here:
//
// http://challenge.code2040.org/api/register
//
// The registration endpoint expects a JSON dictionary with two keys, token and github. This JSON should be sent in the body of your HTTP request.
//
// For token, pass in a string with the token you see above. For github, pass in the URL of the repository you created in the last step.
//
// Hint: HTTP has a few types of “methods.” The registration endpoint is going to be expecting you to use POST to send your JSON.

// My API Token: 5e48f1cba5a455754ebadee36f5293fc
var request = require('request-promise');

  var options = {
    method: "POST",
    uri: "http://challenge.code2040.org/api/register",
    body: {
      "token": "5e48f1cba5a455754ebadee36f5293fc",
      "github": "https://github.com/jonathanv3232/CODE2040_API"
    },
    json: true
  };

  request(options)
    .then(function (response) {
      console.log("registration succesful", response);
    })
    .catch(function (err) {
      console.log("error: ", err);
    });
