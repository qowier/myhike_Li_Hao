function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

function readQuote() {
    db.collection("quotes").doc("Tuesday")
        .onSnapshot(tuesdayDoc => {
            console.log("current document data: " + tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;

            //Here are other ways to access key:value data fields
            //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
            //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
        })
}
readQuote()

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("Hikes");

    hikesRef.add({
        code: "BBY01.jpg",
        name: "Burnaby Lake Park Trail", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10",
        details: "Haurence once every 10 years",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    hikesRef.add({
        code: "AM01.jpg",
        name: "Buntzen Lake Trail Trail", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5",
        details: "Jack goes here every week",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    hikesRef.add({
        code: "NV01.jpg",
        name: "Mount Seymoure Trail", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2",
        details: "Barry finishes the hike every morning",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
}

writeHikes();

function displayCards(Hikes) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(Hikes).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name; // get value of the "name" key
                var details = doc.data().details; // get value of the "details" key
                var hikeID = doc.data().code; //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(Hikes + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("hikes");