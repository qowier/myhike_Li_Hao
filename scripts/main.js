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