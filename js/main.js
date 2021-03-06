var beginBtn = document.getElementById('begin');
beginBtn.onclick = startPractice;

var returnBtn = document.getElementById('return');
returnBtn.onclick = endPractice;

var return2Btn = document.getElementById('return2');
return2Btn.onclick = endPractice;

var return3Btn = document.getElementById('return3');
return3Btn.onclick = endPractice;

var switchPageBtn = document.getElementById('moreWords');
switchPageBtn.onclick = switchPg;

var startMoreBtn = document.getElementById('beginMore');
startMoreBtn.onclick = startMore;

document.getElementById('profile').onclick = showMenu;
document.getElementById('reviewBtn').onclick = viewMissed;
document.getElementById('logout').onclick = signOut;

document.getElementById('logout').style.display = "none";
document.getElementById('reviewBtn').style.display = "none";

var wordarr = [];
var count = 1;
var limit = 10;
var pointer = 0;
var opacity = 1;
var enabled = false;
var show = true;
var hidden = true;
var word;

document.getElementById('page2').style.display = "none";
document.getElementById('page3').style.display = "none";
document.getElementById('page4').style.display = "none";


var range = $('.input-range'),
    value = $('.range-value');

value.html("10 reps");

range.on('input', function(){
    value.html(this.value  + " reps");
    limit = this.value;
});

var answer = document.getElementById('answer');
answer.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        checkAnswer(e);
    }
});

function endPractice() {
  document.getElementById('page1').style.display = "block";
  document.getElementById('page2').style.display = "none";
  document.getElementById('page3').style.display = "none";
  document.getElementById('page4').style.display = "none";
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
}

function startPractice() {
  wordarr = [];
  pointer = 0;
  count = 1;
  opacity = 1;
  enabled = false;
  show = true;
  if(document.getElementById('input1').value != "")
    wordarr.push(document.getElementById('input1').value);
  if(document.getElementById('input2').value != "")
    wordarr.push(document.getElementById('input2').value);
  if(document.getElementById('input3').value != "")
    wordarr.push(document.getElementById('input3').value);
  if(document.getElementById('input4').value != "")
    wordarr.push(document.getElementById('input4').value);
  if(document.getElementById('input5').value != "")
    wordarr.push(document.getElementById('input5').value);
  if(document.getElementById('input6').value != "")
    wordarr.push(document.getElementById('input6').value);
  document.getElementById('page2').style.display = "block";
  document.getElementById('page1').style.display = "none";
  document.getElementById('page3').style.display = "none";
  document.getElementById('page4').style.display = "none";
  enabled = document.getElementById('enabled').checked;
  showWord();
}

function switchPg() {
  document.getElementById('page1').style.display = "none";
  document.getElementById('page2').style.display = "none";
  document.getElementById('page3').style.display = "none";
  document.getElementById('page4').style.display = "block";
}

function startMore() {
  wordarr = [];
  pointer = 0;
  count = 1;
  opacity = 1;
  enabled = false;
  show = true;
  if(document.getElementById('list').value != "")
    var str = document.getElementById('list').value;
    var res = str.split(",");
    wordarr = res;
  document.getElementById('page1').style.display = "none";
  document.getElementById('page2').style.display = "block";
  document.getElementById('page3').style.display = "none";
  document.getElementById('page4').style.display = "none";
  enabled = document.getElementById('enabled').checked;
  showWord();
}

function showWord() {
  document.getElementById('answer').value = "";
  document.getElementById('answer').style.color = "#455A64";
  if (count <= limit && pointer < wordarr.length) {
    word = wordarr[pointer];
    document.getElementById('word').innerHTML = word;
    document.getElementById('count').innerHTML = count + "/" + limit;
    count += 1;
  }
  else if (count > limit && (pointer+1) < wordarr.length) {
    pointer +=1;
    count = 1;
    opacity = 1;
    document.getElementById('word').style.opacity = 1;
    word = wordarr[pointer];
    document.getElementById('word').innerHTML = word;
    document.getElementById('count').innerHTML = count + "/" + limit;
    count += 1;
    show = true;
  }
  else {
    document.getElementById('page1').style.display = "block";
    document.getElementById('page2').style.display = "none";
    document.getElementById('page3').style.display = "none";
    document.getElementById('page4').style.display = "none";
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
  }

  if (!show) {
    document.getElementById('word').style.opacity = 0;
  } else {
    document.getElementById('word').style.opacity = 1;
  }

  if (enabled) {
    setTimeout(function() { responsiveVoice.speak(word); }, 500);
    show = false;
  }
}

function checkAnswer(e) {
  input = e.target.value;
  if (input == wordarr[pointer]) {
    document.getElementById('answer').style.color = "#00e500";
    if (opacity >= 0.2) {
      opacity -= 1/limit;
      document.getElementById('word').style.opacity = opacity;
    }
    setTimeout(function() { showWord() }, 1300);
    console.log('access');
  }
  else {
    document.getElementById('answer').style.color = "#e50000";
    document.getElementById('word').style.opacity = 1;
    opacity = 1;
    show = true;
    addMissedWord(word);
    writeUserData(missedWords);
    setTimeout(function() { document.getElementById('answer').style.color = "#455A64"; }, 1300);
  }
}

function showMenu() {
  if (typeof getToken() != 'undefined') {
    hidden = !hidden;
    if (!hidden) {
      document.getElementById('logout').style.display = "block";
      document.getElementById('reviewBtn').style.display = "block";
    } else {
      document.getElementById('logout').style.display = "none";
      document.getElementById('reviewBtn').style.display = "none";
    }
  }
}

function viewMissed() {
  document.getElementById('page1').style.display = "none";
  document.getElementById('page2').style.display = "none";
  document.getElementById('page3').style.display = "block";
  document.getElementById('page4').style.display = "none";
  var words = getMissedWords();
  var ul = document.getElementById("missed");
  ul.innerHTML = '';

  for (var i = 0; i < words.length; i++) {

    var listItem = document.createElement("li");
    listItem.innerHTML = words[i];

    ul.appendChild(listItem);
  }
}
