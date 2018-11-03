var beginBtn = document.getElementById('begin');
beginBtn.onclick = startPractice;

var wordarr = [];

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
