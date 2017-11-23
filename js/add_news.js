function isOnline() {
  return window.navigator.onLine;
}

//Loading photo for future adding to news.html
$(document).ready(function addImage(input, n) {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#img').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("input[type=file]").change(function() {
    readURL(this);
  });

  //Check news fields info
  $(document).on("click", "#send_news", function() {

    var title = $("#title").val();
    var description_short = $("#description_short").val();
    var description_long = $("#description_long").val();
    var error = false;

    //Errors info
    if (title.length > 100) {
      document.getElementById("title").style.borderColor = "red";
      $("#title").notify("Не більше 100 символів");
      error = true;
    }
    if (title.length < 10) {
      document.getElementById("title").style.borderColor = "red";
      $("#title").notify("Не менше 10 символів");
      error = true;
    }
    if (title.length == 0) {
      document.getElementById("title").style.borderColor = "red";
      $("#title").notify("Це поле має бути заповнене");
      error = true;
    }
    if (description_short.length > 100) {
      document.getElementById("description_short").style.borderColor = "red";
      $("#description_short").notify("Не більше 100 символів");
      error = true;
    }
    if (description_short.length == 0) {
      document.getElementById("description_short").style.borderColor = "red";
      $("#description_short").notify("Це поле має бути заповнене");
      error = true;
    }
    if (description_long.length > 1000) {
      document.getElementById("description_long").style.borderColor = "red";
      $("#description_long").notify("Не більше 1000 символів");
      error = true;
    }
    if (description_long.length == 0) {
      document.getElementById("description_long").style.borderColor = "red";
      $("#description_long").notify("Це поле має бути заповнене");
      error = true;
    }
    if (error != true) {
      document.getElementById("description_short").style.borderColor = "grey";
      document.getElementById("title").style.borderColor = "grey";
      alert("Новина успішно опублікована!");
      $('#img').attr('src', "img/camera.png");
      $("#description_short").val("");
      $("#title").val("");
    }


  });
});
