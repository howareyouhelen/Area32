$(document).ready(function() {

  var dbEvents = firebase.database().child("Events").orderByChild("counter");
  dbEvents.on("value", function(events){
    if(events.exists){
      var eventsHtml = "";
      events.forEach(function(singleEvent){
        counter += 1;
        eventsHtml += "<div class='jumbotron bg-light text-dark border border-dark'>";
            eventsHtml += "<div> <img width='800' height='450'/>";
              eventsHtml += events.val.image;
            eventsHtml += "</div><br>";

            eventsHtml += "<div class='row'>";
              eventsHtml += "<div class='col-sm-5'> <p style='color: grey'>"
                  + "Created by: " + events.val().userName
                  + "</p></div>"
                  + "<div class='col-sm-5'> <p style='color: grey'>"
                  + "Created by: " + events.val().userName
                  + "</p></div>"
                  ;
            eventsHtml += "</div><br>";
        eventsHtml += "</div>";
      });
    }
  });

});