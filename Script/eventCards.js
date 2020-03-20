
/**
 * Represents the event object. It stores the specified values of an event.
 * @param {*} type the type of event 
 * @param {*} name  name of the event as a string
 * @param {*} date  the date it is being held at.
 * @param {*} price  the price of teh event
 * @param {*} description description of the event 
 * @param {*} hostName name of the host
 */
function eventCard(type, name, date, price, description, hostName){
    
    this.type = type;
    this.name = name;
    this.date = date;
    this.price = price;
    this.description = description;
    this.hostName = hostName;

    db.collection("Events").add({
        type : this.type,
        name : this.name,
        date : this.date,
        price : this.price,
        description : this.description,
        hostName : this.hostName
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    this.getType = function(){
        return this.type;
    }
    this.getName = function(){
        return this.name;
    }
    this.getDate = function(){
        return this.date;
    }
    this.getPrice = function(){
        return this.price;
    }
    this.getDescription = function(){
        return this.description;
    }
    this.getHoseName = function(){
        return this.hostName;
    }
}

let twerkvaran = new eventCard("Dance", "TAN", "2020-04-08", "Free", "Online twerking workshop with Teg.", "TEG");