$(".course").hide();
/*$(".hider").hide();*/

generateForm();

var coll = document.getElementsByClassName("eventHeader");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } 
    else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

function hideIrrelevant() {
  var sel = O("selectCalendar")
  var selected = sel.options[sel.selectedIndex].value;
  if (selected == "Course_Code") {
    $(".student").hide();
    $(".course").show();
  }
  else {
    $(".student").show();
    $(".course").hide();
  }
}

function generateForm() {
  var eventBox = document.createElement("div");
  eventBox.setAttribute('class', 'eventBox');

  var eventTitle = document.createElement('div');
  eventTitle.setAttribute('class', 'eventHeader');
  eventTitle.innerHTML = "TITLE";

  var eventContent = document.createElement("div");
  eventContent.setAttribute('class', 'eventContent');

  eventBox.append(eventTitle);
  eventBox.append(eventContent);

  O('formInserter').append(eventBox);
}
