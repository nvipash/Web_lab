//Adding Response to response.html
function addResponse() {
  var responseText = document.getElementById("comment");
  var nameText = document.getElementById("name");
  if (nameText.value == "") {
    alert("Вкажіть ваше ім'я");
    return;
  }
  if (responseText.value == "") {
    alert("Заповніть поле відгуку");
    return;
  }
  var responseField = document.getElementById("newResponseField");
  var element = document.getElementById("responses");
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
  var dateString = "";
  dateString = date.getDate() + "." + date.getMonth() + "." + (date.getFullYear()) +
    ", " + date.getHours() + ":" + date.getMinutes();
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
  element.insertBefore(document.createElement("hr"), responseField);
  responseText.value = "";
  nameText.value = "";
}
