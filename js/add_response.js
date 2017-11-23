function isOnline() {
  return window.navigator.onLine;
}
//Adding Response to response.html
function addResponse() {
  var responseText = document.getElementById("comment");
  var nameText = document.getElementById("name");
  if (nameText.value == "") {
    document.getElementById("name").style.borderColor = "red";
    $("#name").notify("Вкажіть ваше ім'я");
    error = true;
    return;
  }
  if (responseText.value == "") {
    document.getElementById("comment").style.borderColor = "red";
    $("#comment").notify("Заповніть поле відгуку");
    error = true;
    return;
  }
  //Get elements from file
  var responseField = document.getElementById("newResponseField");
  var element = document.getElementById("responses");

  //Initialize elements
  var responseRow = document.createElement("div");
  responseRow.setAttribute("class", 'card');
  var responseCol = document.createElement("div");
  var responseHeader = document.createElement("p");
  var responseFill = document.createElement("p");
  var responseHeaderName = document.createElement("span");
  responseHeaderName.setAttribute("class", "h2 pull-left");
  var responseHeaderDate = document.createElement("p");
  var responseHeaderDate = document.createElement("span");
  var responseHeaderDateItalic = document.createElement("i");
  var date = new Date();
  var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + (date.getFullYear()) +
    ", " + date.getHours() + ":" + date.getMinutes();

  //Transfer data to addResponse()
  responseHeaderDateItalic.innerHTML = dateString;
  responseHeaderName.innerHTML = nameText.value + " ";
  responseFill.innerHTML = responseText.value;
  responseHeaderDate.appendChild(responseHeaderDateItalic);
  responseHeader.appendChild(responseHeaderName);
  responseHeader.appendChild(responseHeaderDate);
  responseCol.appendChild(responseHeader);
  responseCol.appendChild(responseFill);
  responseRow.appendChild(responseCol);
  element.insertBefore(responseRow, responseField);
  responseText.value = "";
  nameText.value = "";
}
