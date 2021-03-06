$(document).ready(function() {
  var counter = 0;
  var useruid = "WoFpYXGKSmPX9DLC2Bx8Rs9E8R73";
  var dbEvents = firebase.database().ref().child("Events").orderByChild("uid").equalTo(useruid);

  dbEvents.on("value", function(events){
    if(events.exists){
      var eventsHtml = "";
      events.forEach(function(singleEvent){
        counter += 1;
        eventsHtml += "<div id='event-holder' class='jumbotron bg-light text-dark border border-dark'>";

            eventsHtml += "<div style='text-align: center; color: black;'> ";
            eventsHtml += "<h4>" 
                            + singleEvent.val().eventname
                            + "</h4>" 
            eventsHtml += "</div><br>";

            eventsHtml += "<div style='text-align:center'> <img width='800' height='440' src='";
              eventsHtml += singleEvent.val().image;
            eventsHtml += "'/></div><br>";

            eventsHtml += "<div class='row'>";
              eventsHtml += "<div class='col-sm-4'> <p style='color: grey'>"
                  + "Created on: " + singleEvent.val().date
                  + "</p></div>"
                  + "<div class='col-sm-3'> <p style='color: grey'>"
                  + "Created at: " + singleEvent.val().time
                  + "</p></div>"
                  ;
            eventsHtml += "</div><br>";
            
            eventsHtml += "<div style='text-align: left; color: black;'> ";
              eventsHtml += "<h6>Description: </h6>" + singleEvent.val().desc;
            eventsHtml += "</div><br>";

            eventsHtml += "<div class='row'>";
            eventsHtml += "<div class='col-sm-4'> <p style='color: grey'>"
                + "Event Date: " + singleEvent.val().eventdate + singleEvent.val().userName
                + "</p></div>"
                + "<div class='col-sm-3'> <p style='color: grey'>"
                + "Location: " + singleEvent.val().location
                + "</p></div>"
                ;
            eventsHtml += "</div><br>";

            eventsHtml += "<div class='row'>";
            eventsHtml += "<div class='col-sm-4'> <p style='color: grey'>"
                + "Price: " + singleEvent.val().price
                + "</p></div>"
                + "<div class='col-sm-3'> <p style='color: grey'>"
                + "Type: " + singleEvent.val().type
                + "</p></div>"
                ;
            eventsHtml += "</div><br>";

        eventsHtml += "</div>";
      });
      $("#events").html(eventsHtml);
    }
  });

});