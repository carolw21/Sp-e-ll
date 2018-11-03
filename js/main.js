var beginBtn = document.getElementById('begin');
beginBtn.onclick = startPractice;

var wordarr = [];

document.getElementById('page2').style.display = "none";
document.getElementById('page3').style.display = "none";

function startPractice() {
  wordarr = [];
  wordarr.push(document.getElementById('input1').value);
  wordarr.push(document.getElementById('input2').value);
  wordarr.push(document.getElementById('input3').value);
  wordarr.push(document.getElementById('input4').value);
  wordarr.push(document.getElementById('input5').value);
  wordarr.push(document.getElementById('input6').value);
  document.getElementById('page2').style.display = "block";
  document.getElementById('page1').style.display = "none";
}

<p id="demo"></p>


var count = 1;
var limit = 3;
var pointer = 0;


function myFunction() {
    if (count < limit && pointer < wordarr.length) {
        var word = wordarr[pointer];
        document.getElementById("demo").innerHTML = [word, count];
        count += 1;
        }
    else if (count >= limit && (pointer+1) < wordarr.length) {
        pointer +=1;
        count = 1;
        var word = wordarr[pointer];
        document.getElementById("demo").innerHTML = [word, count];
        count += 1;
        }
    else {
        document.getElementById("demo").innerHTML = "stop";
        }
}
function checkRight() {
    input = document.getElementById("form2").elements["name"].value;
    if (input == wordarr[pointer]) {
       document.getElementById("demo").innerHTML = "Correct";
       myFunction();
    }
    else {
       document.getElementById("demo").innerHTML = "Try Again";
    }
}
