// Initiates Firebase
var config = {
  apiKey: "AIzaSyC9lq8l9sXlpUwQrGAWUda2qw_-faJUbiA",
  authDomain: "commentform-807d4.firebaseapp.com",
  databaseURL: "https://commentform-807d4.firebaseio.com",
  projectId: "commentform-807d4",
  storageBucket: "",
  messagingSenderId: "184726345923"
};
firebase.initializeApp(config);

var database = firebase.database();

// Function to fire off once the page is done loading
$(document).ready(function() {
  // Timer to fire off h3 animation after a second
  setTimeout(function() { $("#in-out").attr("class", "animated tada"); }, 1000);
});

// On click function for submit button on the contact form
$("#contactSub").on("click", function(event) {
  event.preventDefault();

  // Save values into variables
  var name = $("#name-input").val().trim();
  var email = $("#email-input").val().trim();
  var message = $("#message-input").val().trim();

  // If data entered is valid, save it into an array and push the data to a firebase directory
  if ((name !== "") && (email !== "") && (email.includes("@")) && (message !== "")) {

    // Object to push to Firebase
    var contactFormEntry = {
        contactName: name,
        contactEmail: email,
        contactMessage: message
    };

    // Push above object into the /messages path
    database.ref("/messages").push(contactFormEntry);

    // Empties out the text fields
    name = $("#name-input").val("");
    email = $("#email-input").val("");
    message = $("#message-input").val("");
  }

  // If data is invalid, check to see which condition is met and display error accordingly; does not push data to firebase
  else {
      if (name === "") {
          $("#name-input").val("");
          $("#name-input").attr("placeholder", "Please enter your name!");
      }
      if ((email === "") || (!email.includes("@"))) {
          $("#email-input").val("");
          $("#email-input").attr("placeholder", "Please enter a valid email!");
      }
      if (message === "") {
          $("#message-input").val("");
          $("#message-input").attr("placeholder", "Please enter a message!");
      }
  }
});