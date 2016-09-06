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
const TOKEN = "5e48f1cba5a455754ebadee36f5293fc";
const CODE2040URL = 'http://challenge.code2040.org/api/';
var options = {
    method: "POST",
    body: {"token": TOKEN},
    json: true
    };

function register(){
  options.uri = CODE2040URL + "register";
  options.body.github = "https://github.com/jonathanv3232/CODE2040_API";
  request(options)
    .then(function (response) {
      console.log("succesful: ", response);
    })
    .catch(function (err) {
      console.log("error: ", err);
    });
}

function reverseString(){
  options.uri = CODE2040URL + "reverse";
  request(options)
    .then(function (response) {
      console.log("reverse this string ", response);
      options.uri = CODE2040URL + "reverse/validate";
      var string = response.split("").reverse().join("");
      options.body.string = string;
      request(options)
        .then(function (response) {
          console.log("successful: ", response);
        })
        .catch(function (err) {
          console.log("error: ", err);
        });
    })
    .catch(function (err) {
      console.log("error: ", err);
    });
}

function findTheNeedle() {
  options.uri = CODE2040URL + "haystack";
  request(options)
    .then(function (response) {
      console.log("find this string ", response);
      options.uri = CODE2040URL + "haystack/validate";
      var needle = response.needle
      options.body.needle = response.haystack.indexOf(needle);
      request(options)
        .then(function (response) {
          console.log("successfully sent the index of the needle: ", response);
        })
        .catch(function (err) {
          console.log("error: ", err);
        });
    })
    .catch(function (err) {
      console.log("error: ", err);
    });
}

function doesNotContainPrefix(string) {

  return string.startsWith(string);
}

function notWithPrefix() {
  options.uri = CODE2040URL +  "prefix";
  request(options)
    .then(function (response) {
      console.log("find the strings that don't match with the prefix", response);
      options.uri = CODE2040URL + "prefix/validate";
      var prefix = response.prefix;
      options.body.array = response.array.filter(function(string) {
                              return !string.startsWith(prefix);
                            });
      request(options)
        .then(function (response) {
          console.log("successfully returned an array with strings that don't contain the prefix: ", response);
        })
        .catch(function (err) {
          console.log("error: ", err);
        });
    })
    .catch(function (err) {
      console.log("error: ", err);
    });
}

function addingTime() {
  options.uri = CODE2040URL + "dating";
  request(options)
    .then(function (response) {
      console.log("Time object", response);

      options.uri = CODE2040URL + "dating/validate";
      var date = new Date(response.datestamp);
      date.setSeconds(date.getSeconds() + response.interval);
      options.body.datestamp = date.toISOString().replace(/\..+/, 'Z');;
      request(options)
        .then(function (response) {
          console.log("successfully returned an updated date stamp: ", response);
        })
        .catch(function (err) {
          console.log("error: ", err.message);
        });
    })
    .catch(function (err) {
      console.log("error: ", err.message);
    });
}

register();
reverseString();
findTheNeedle();
notWithPrefix();
addingTime();
