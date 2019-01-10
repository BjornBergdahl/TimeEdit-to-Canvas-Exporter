$(".course").hide();
displayStep(["first"]);

function displayStep(stepList) {
  O('first').classList.add("sunken");
  O('second').classList.add("sunken");
  O('third').classList.add("sunken");
  O('fourth').classList.add("sunken");

  for (i = 0; i < stepList.length; i++) {
    step = stepList[i];
    O(step).classList.add("card");
    O(step).classList.remove("sunken");
  }
}

function importCalendar() {
  var URL = O("calendarURL").value;
  // If URL is .html, changes extension to .json
  if (URL.slice(-5) === ".html") {
    URL = URL.substring(0, URL.length - 5);
    URL = URL + ".json";
  }
  loadFile(URL, createEvents, "New message!\n\n");
}

function confirmSettings() {
  alert("works");
  displayStep(["third"]);
}

function deleteEvent(link) {
  link.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
}

function postTest(link, user_id, token, title, startDate, startTime, endDate, endTime, location, description) {
  var URL = 'http://localhost:8000/api/v1/calendarevent';
  var xhr = new XMLHttpRequest();
  var fd = new FormData();

  fd.append('user', user_id);
  fd.append('token', token);

  fd.append('title', title);
  fd.append('description', description);
  fd.append('start_date', startDate);
  fd.append('start_time', startTime);
  fd.append('end_date', endDate);
  fd.append('end_time', endTime);
  fd.append('location', location);

  // On successful data submission
  xhr.addEventListener('load', function(event) {
    O('returnMessage').innerHTML = O('returnMessage').innerHTML + 'Calendar event ' + title + ', ' + startDate + ' @ ' + startTime + ', published to Canvas <br />';
    deleteEvent(link);

  });

  // On error
  xhr.addEventListener('error', function(event) {
    alert('Something went wrong. Event not exported.');
  });

  // Set up request
  xhr.open('POST', URL);

  // Send FormData object; HTTP headers are set automatically
  xhr.send(fd);
}

function sendEvent(link) {

  var user_id = O('userId').value;
  var token = O('accessToken').value;

  var title = link.parentNode.parentNode.querySelectorAll("*[name='title']")[0].value;
  var startDate = link.parentNode.parentNode.querySelectorAll("*[name='startDate']")[0].value;
  var startTime = link.parentNode.parentNode.querySelectorAll("*[name='startTime']")[0].value;
  var endDate = link.parentNode.parentNode.querySelectorAll("*[name='endDate']")[0].value;
  var endTime = link.parentNode.parentNode.querySelectorAll("*[name='endTime']")[0].value;
  var location  = link.parentNode.parentNode.querySelectorAll("*[name='location']")[0].value;
  var description  = link.parentNode.parentNode.querySelectorAll("*[name='description']")[0].value;

  var start_at = startDate + 'T' + startTime + ':00Z';
  var end_at = endDate + 'T' + endTime + ':00Z';

  postTest(link, user_id, token, title, startDate, startTime, endDate, endTime, location, description);
}

function deleteAllEvents() {

  var paras = document.getElementsByClassName('eventBox');

  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  }
}

function makeEventsClickable() {
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
}

function createEvents(message) {
    console.log(message + this.responseText);

    var obj = JSON.parse(this.responseText);

    if (this.responseText != null) {
      displayStep(['first', 'second', 'third']);
    }

    var courses = obj.reservations;
    
    for (i = 0; i < courses.length; i++) {
      c = courses[i];
      var place = c.columns[1];

      // Makes description from other attributes
      var desc = "";
      for (j = 0; j < c.columns.length; j++) {
        // If attrubute is not location (already used for Canvas field)
        value = c.columns[j];
        if (j != 1) {
          if (value != "") {
            if (desc != "") {
              desc = desc + " - " + value;
            }
            else {
              desc = desc + c.columns[j];
            }
          }
        }
      }

      generateForm(c.id, c.id, c.startdate, c.starttime, c.enddate, c.endtime, place, desc);
    }

    makeEventsClickable();

    alert(courses.length + " Calendar Events imported!")
}

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

function generateForm(id, title, startDate, startTime, endDate, endTime, location, description) {
  var eventBox = document.createElement('div');
  eventBox.setAttribute('class', 'eventBox');

  var eventTitle = document.createElement('div');
  eventTitle.setAttribute('class', 'eventHeader');
  eventTitle.innerHTML = startDate + " &nbsp;@&nbsp;  " + startTime;

  var eventContent = document.createElement('div');
  eventContent.setAttribute('class', 'eventContent');

  var extraMargin = document.createElement('div');
  extraMargin.setAttribute('class', 'extraMargin');

  var form = document.createElement('form');
  form.setAttribute('action', 'javascript:void(0);');
  form.setAttribute('id', 'eventForm');

  eventBox.append(eventTitle);
  eventBox.append(eventContent);

  eventContent.append(extraMargin);

  extraMargin.append(form);

  /* ----- FIELDS ----- */
  generateFormRow(form, 'Title:', 'title', title);
  generateFormRow(form, 'Start Date:', 'startDate', startDate);
  generateFormRow(form, 'Start Time:', 'startTime', startTime);
  generateFormRow(form, 'End Date:', 'endDate', endDate);
  generateFormRow(form, 'End Time:', 'endTime', endTime);
  generateFormRow(form, 'Location:', 'location', location);

  var label = document.createElement('label');
  label.innerHTML = "Description:"

  var textarea = document.createElement('textarea');
  textarea.setAttribute('form', 'eventForm');
  textarea.innerHTML = description;
  textarea.setAttribute('class', 'fullWidth');
  textarea.setAttribute('name', 'description');

  form.append(label);
  form.append(textarea);

  /* ----- /FIELDS ----- */

  /* ----- BUTTONS ----- */

  var buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('class', 'buttonWrapper');
  
  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'redButton');
  deleteButton.innerHTML = "Delete&nbsp;&nbsp;<i class='fas fa-trash-alt'></i>";
  deleteButton.setAttribute("onclick", "deleteEvent(this)");

  var sendButton = document.createElement('button');
  sendButton.setAttribute('class', 'greenButton');
  sendButton.innerHTML = "Send&nbsp;&nbsp;<i class='fas fa-paper-plane'></i>";
  sendButton.setAttribute("onclick", "sendEvent(this)");

  buttonWrapper.append(deleteButton);
  buttonWrapper.append(sendButton);

  form.append(buttonWrapper);

  /* ----- /BUTTONS ----- */

  O('formInserter').append(eventBox);
}

function generateFormRow(form, text, name, value) {
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
  inp.setAttribute('value', value);

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
    alert("Not a valid URL");
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