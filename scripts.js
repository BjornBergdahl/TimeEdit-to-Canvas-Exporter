$(".course").hide();
/*$(".hider").hide();*/

generateForm();
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

/* ----- /TESTING GET ----- */
function showMessage(message) {
    console.log(message + this.responseText);

    /*console.log(this.responseText);*/

    var obj = JSON.parse(this.responseText);

    console.log(obj.reservations[0].id);
}

loadFile("https://cloud.timeedit.net/ltu/web/schedule1/ri167XQQ505Z50Qv8Q093gZ6y5Y320976Y75Y.json", showMessage, "New message!\n\n");
/* ----- /TESTING GET ----- */

function hideIrrelevant() {
  var sel = O("selectCalendar")
  var selected = sel.options[sel.selectedIndex].value;
  if (selected == "course") {
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

  /* ----- FIELDS ----- */

  generateFormRow(form, 'Title:', 'title');
  generateFormRow(form, 'Start Date:', 'startDate');
  generateFormRow(form, 'Start Time:', 'startTime');
  generateFormRow(form, 'End Date:', 'endDate');
  generateFormRow(form, 'End Time:', 'endTime');
  generateFormRow(form, 'Location:', 'location');

  var label = document.createElement('label');
  label.innerHTML = "Description:"

  var textarea = document.createElement('textarea');
  textarea.setAttribute('form', 'eventForm');
  textarea.setAttribute('name', 'description');
  textarea.setAttribute('class', 'fullWidth');

  form.append(label);
  form.append(textarea);

  /* ----- /FIELDS ----- */

  /* ----- BUTTONS ----- */

  var buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('class', 'buttonWrapper');
  
  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'redButton');
  deleteButton.innerHTML = "Delete&nbsp;&nbsp;<i class='fas fa-trash-alt'></i>";

  var sendButton = document.createElement('button');
  sendButton.setAttribute('class', 'greenButton');
  sendButton.innerHTML = "Send&nbsp;&nbsp;<i class='fas fa-paper-plane'></i>";

  buttonWrapper.append(deleteButton);
  buttonWrapper.append(sendButton);

  form.append(buttonWrapper);

  /* ----- /BUTTONS ----- */

  O('formInserter').append(eventBox);
}

function generateFormRow(form, text, name) {
  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  var col1 = document.createElement('div');
  col1.setAttribute('class', 'column');
  col1.innerHTML = text;
  var col2 = document.createElement('div');
  col2.setAttribute('class', 'column');
  var inp = document.createElement('input');
  inp.setAttribute('type', 'text');
  inp.setAttribute('name', name);

  form.append(row);
  row.append(col1);
  row.append(col2)
  col2.append(inp);
}


function xhrSuccess() { 
    this.callback.apply(this, this.arguments); 
}

function xhrError() { 
    console.error(this.statusText);
}

function loadFile(url, callback /*, opt_arg1, opt_arg2, ... */) {
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("GET", url, true);
    xhr.send(null);
}