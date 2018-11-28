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
  var eventBox = document.createElement('div');
  eventBox.setAttribute('class', 'eventBox');

  var eventTitle = document.createElement('div');
  eventTitle.setAttribute('class', 'eventHeader');
  eventTitle.innerHTML = 'Event Title';

  var eventContent = document.createElement('div');
  eventContent.setAttribute('class', 'eventContent');

  var extraMargin = document.createElement('div');
  extraMargin.setAttribute('class', 'extraMargin');

  var form = document.createElement('form');
  form.setAttribute('action', 'ADDACTIONHERE');
  form.setAttribute('id', 'eventForm');

  eventBox.append(eventTitle);
  eventBox.append(eventContent);

  eventContent.append(extraMargin);

  extraMargin.append(form);

  /* ----- ROWS AND COLUMNS ----- */

  var row1 = document.createElement('div');
  row1.setAttribute('class', 'row');
  var col11 = document.createElement('div');
  col11.setAttribute('class', 'column');
  col11.innerHTML = 'Title:';
  var col12 = document.createElement('div');
  col12.setAttribute('class', 'column');
  var inp1 = document.createElement('input');
  inp1.setAttribute('type', 'text');
  inp1.setAttribute('name', 'title');

  form.append(row1);
  row1.append(col11);
  row1.append(col12)
  col12.append(inp1);



  O('formInserter').append(eventBox);
}
