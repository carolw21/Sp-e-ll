var provider = new firebase.auth.GoogleAuthProvider();

var missedWords = [];
var token;
var user;

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;

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
  firebase.database().ref('users/' + user.displayName).set({
    'words': missedWords
  });
}

function readUserData() {
  var wordsRef = firebase.database().ref('users/' + user.displayName);
  wordsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        missedWords = snapshot.val()['words'];
        console.log(missedWords);
      });
  });
}

function getMissedWords() {
  readUserData();
  return missedWords;
}

function addMissedWord(word) {
  missedWords.push(word);
}
