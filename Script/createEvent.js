$(document).ready(function() {
// <!----------------------------------Validation and uploading of Event Creation ------------------------------------>
    var counter = 0;
    var validImagetypes = ["image/gif", "image/jpeg", "image/png"];

    $("#selected-image").hide();

    function previewImage(image_event) {
    if(image_event.files && image_event.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
        $("#selected-image").attr('src', e.target.result);
        }
    reader.readAsDataURL(image_event.files[0]);
    
    $("#selected-image").show(); 
    }
    }

    $("#main-image").change(function() {
    previewImage(this);
    });

    $("#save-event").click(function(){
    $("#main-desc").removeClass("is-invalid");
    $("#main-image").removeClass("is-invalid");
    $("#main-eventname").removeClass("is-invalid");
    $("#main-price").removeClass("is-invalid");
    $("#main-type").removeClass("is-invalid");
    $("#main-eventdate").removeClass("is-invalid");
    $("#main-location").removeClass("is-invalid");

    var desc = $("#main-desc").val();
    var image = $("#main-image").prop("files")[0];
    var eventname = $("#main-eventname").val();
    var price = $("#main-price").val();
    var type = $("#main-type").val();
    var eventdate = $("#main-eventdate").val();
    var location = $("#main-location").val();

    if(!desc){
        $("#main-desc").addClass("is-invalid");
        return;
    }
    if(image == null) {
        $("#main-image").addClass("is-invalid");
        return;
    }
    if($.inArray(image["type"], validImagetypes)<0){
        $("#main-image").addClass("is-invalid");
        return;
    }
    if(!eventname){
        $("#main-eventname").addClass("is-invalid");
    }
    if(!price){
        $("#main-price").addClass("is-invalid");
    }
    if(!type){
        $("#main-type").addClass("is-invalid");
    }
    if(!eventdate){
        $("#main-eventdate").addClass("is-invalid");
    }
    if(!location){
        $("#main-location").addClass("is-invalid");
    }


// UPLOAD AND SAVE TO FIREBASE STORAGE AND DATABASE
    var databaseRef = firebase.database().ref().child("Events");

    databaseRef.once("value").then(function(){
        //unique name for storage
        var name = image["name"];
        var dateStr = new Date().getTime();
        var fileCompleteName = name + "_" + dateStr;

        var storageRef = firebase.storage().ref("Event Images");
        var eventStorageRef = storageRef.child(fileCompleteName);
        var uploadTask = eventStorageRef.put(image);

        uploadTask.on("state_changed",

            function progress(snapshot){
                var percentage = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
                $("#upload-progress").html(Math.round(percentage) + "%");
                $("#upload-progress").attr("style", "width:" + percentage + "%");
            },
            function error(err) {
                
            },
            function complete() {

                var user = firebase.auth().currentUser;
                var userName;
                firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot){
                    var name = (snapshot.val() && snapshot.val().name);
                    var email = (snapshot.val() && snapshot.val().email);
                    var userName = name + " " + email;
                });

                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl){
                    var time = new Date();
                    var options = {
                        weekday: "long",
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    };

                    var eventData = {
                        "image": downloadUrl,
                        "name": fileCompleteName,
                        "desc": desc,
                        "eventname": eventname,
                        "price": price,
                        "type": type,
                        "eventdate": eventdate,
                        "location": location,
                        "uid": user.uid,
                        "counter": 1000 - counter,
                        "userName": user.name,
                        "time": time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
                        "date":time.toLocaleString('en-US', options),
                    };
                    console.log(databaseRef);
                    var newEventRef = databaseRef.push();
                    newEventRef.set(JSON.parse( JSON.stringify(eventData)), function(error){
                        if(error){
                            $("#result").attr("class", "alert-danger");
                            $("#result").html(error.message);
                        } else {
                            $("#result").attr("class", "alert-success");
                            $("#result").html("Event has been created successfully.");

                            window.open("", "_self");
                        } 
                    resetForm();
                        });
                    });
                }
            );

        });
    });
    // UPLOAD ENDS HERE
// <!----------------------------------Validation and uploading of Event Creation Ends Here ------------------------------------>
    function resetForm(){
        $("#main-form")[0].reset();
        $("#upload-progress").html("Completed");
    }



});