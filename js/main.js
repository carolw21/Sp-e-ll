var beginBtn = document.getElementById('begin');
beginBtn.onclick = startPractice;

var wordarr = [];
var count = 1;
var limit = 10;
var pointer = 0;
var opacity = 1;
var enabled = false;
var show = true;
var word;

document.getElementById('page2').style.display = "none";

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

function startPractice() {
  console.log(missedWords);
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
    showWord = true;
    word = wordarr[pointer];
    document.getElementById('word').innerHTML = word;
    document.getElementById('count').innerHTML = count + "/" + limit;
    count += 1;
  }
  else {
    document.getElementById('page1').style.display = "block";
    document.getElementById('page2').style.display = "none";
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
    setTimeout(function() { showWord(); }, 1300);
  }
  else {
    document.getElementById('answer').style.color = "#e50000";
    document.getElementById('word').style.opacity = 1;
    opacity = 1;
    show = true;
    missedWords.push(word);
    writeUserData(missedWords);
    setTimeout(function() { document.getElementById('answer').style.color = "#455A64"; }, 1300);
  }
}
