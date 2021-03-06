var provider = new firebase.auth.GoogleAuthProvider();

var missedWords = [];
var token;
var user;

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;
  readUserData();

  document.getElementById("profile").src = user.photoURL;

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

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    token = undefined;
    user = undefined;
    document.getElementById('profile').src = "http://mainenordmenn.com/wp-content/uploads/2017/09/Maine-Nordmenn-Board-Generic-Profile.jpg";
    document.getElementById('logout').style.display = "none";
    document.getElementById('reviewBtn').style.display = "none";
    document.getElementById('page1').style.display = "block";
    document.getElementById('page2').style.display = "none";
    document.getElementById('page3').style.display = "none";
    document.getElementById('input1').value = "";
    document.getElementById('input2').value = "";
    document.getElementById('input3').value = "";
    document.getElementById('input4').value = "";
    document.getElementById('input5').value = "";
    document.getElementById('input6').value = "";
    document.getElementById('input-range').value = "10";
    limit = 10;
    value.html("10 reps");
    document.getElementById('enabled').checked = false;
  }).catch(function(error) {
    // An error happened.
  });
}

function getToken() {
  return token;
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
