function showName() {
    firebase.auth().onAuthStateChanged(function (user) {
      document.getElementById("name").innerHTML = user.name;
    });
  }
let twerkvaran = new eventCard("Dance", "TAN", "2020-04-08", "Free", "Online twerking workshop with Teg.", "TEG");

function createCard(type, name, date, price, description, location, hostName, image){
    
    let card = document.createElement("div");
    card.className = "card-body";

    let eventImage = document.createElement("img");
    eventImage.className = "card-img-top"
    eventImage.src = image;

    let eventBody = document.createElement("div");

    let eventTitle = document.createElement("h5");
    eventTitle.className = "card-title";
    eventTitle.innerHTML = "Test";

    let eventDescription = document.createElement("body");
    eventDescription.innerHTML = description;




    }