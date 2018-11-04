var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
// This gives you a Google Access Token. You can use it to access the Google API.
var token = result.credential.accessToken;
// The signed-in user info.
var user = result.user;

var missedWords = [];

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
});

function writeUserData(missedWords) {
  firebase.database().ref('users/' + token).set({
    'words': missedWords
  });
}

function readUserData() {
  var arr = [];
  firebase.database().ref('/users/' + token + '/words').once('value').then(function(snapshot) {
    var word = snapshot.val();
    arr.push(word);
  });
  missedWords = arr;
}

function getMissedWords() {
  var missedWords = readUserData();
  console.log(missedWords);
  return missedWords;
}

function addMissedWord(word) {
  missedWords.push(word);
}
