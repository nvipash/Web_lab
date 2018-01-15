var useLocalStorage = false;

function switchUseLS() {
  useLocalStorage = !useLocalStorage;
}

function isOnline() {
  return window.navigator.onLine;
}

class Response {
  constructor(name, response, date) {
    this.name = name;
    this.response = response;
    this.date = date;
  }
}

function addToStorage(response) {
  if (useLocalStorage) {
    var responses = new Array;
    var response_item = localStorage.getItem('responses');
    if (response_item !== null) {
      responses = JSON.parse(response_item);
    }
    responses.push(response);
    localStorage.setItem('responses', JSON.stringify(responses));
    return false;
  } else {
    var openDB = indexedDB.open("response", 1);

    openDB.onerror = function (event) {
      alert("Error occurred when loading response");
    };
    openDB.onsuccess = function (event) {
      var db = openDB.result;
      var tx = db.transaction(["responses"], "readwrite");
      var store = tx.objectStore("responses");
      var addResponse = store.put(response);
      addResponse.onsuccess = function (event) {
        alert("Response created");
      }
      addResponse.onerror = function (event) {
        alert("Error occurred when loading responses");
      }
      tx.oncomplete = function () {
        db.close();
      }
    };
  }
}

function showLocalInfo() {
  if (useLocalStorage) {
    var response_item = localStorage.getItem('responses');
    if (response_item !== null) {
      responses = JSON.parse(response_item);
    }
    if ((typeof responses !== 'undefined') && (responses.length > 0)) {
      for (var i = 0; i < responses.length; i++) {
        createResponse(responses[i]);
      }
    }
  } else {
    var openDB = indexedDB.open("response", 1);
    openDB.onupgradeneeded = function () {
      var db = openDB.result;
      var store = db.createObjectStore("responses", { keyPath: "name" });
      store.createIndex("name", "name", { unique: false });
      store.createIndex("response", "response", { unique: false });
      store.createIndex("date", "date", { unique: false });
    }
    openDB.onsuccess = function (event) {
      var db = openDB.result;
      var tx = db.transaction("responses", "readwrite");
      var store = tx.objectStore("responses");
      store.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          var tempFeed = new Response(cursor.value.name, cursor.value.response, cursor.value.date);
          //console.log(tempFeed);
          //responses.push(tempFeed);
          createResponse(tempFeed);
          cursor.continue();
        }
      };
      tx.oncomplete = function () {
        db.close();
      }
    }
  }
}

function addResponse() {
  var responseText = document.getElementById("comment");
  var nameText = document.getElementById("name");
  var date = new Date();
  if (nameText.value == "") {
    alert("Вкажіть ваше ім'я");
    return;
  }
  if (responseText.value == "") {
    alert("Порожній відгук!");
    return;
  }
  var response = new Response(nameText.value, responseText.value, date);
  addToStorage(response);
  createResponse(response);
  responseText.value = "";
  nameText.value = "";
}

function createResponse(response) {

  var responseField = document.getElementById("newResponseField");
  var element = document.getElementById("responses");

  var date = new Date(response.date);
  var nameText = response.name;
  var responseText = response.response;
  var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + (date.getFullYear())
    + ", " + date.getHours() + ":" + date.getMinutes();

  var responseRow = document.createElement("div");
  responseRow.innerHTML = '<div class="card"><p><span class="h2 pull-left">' + nameText + ' ' +
    '</span><span><i>' + dateString + '</i></span></p><p>' + responseText + '</p></div></div><hr>';

  element.insertBefore(responseRow, responseField);
}