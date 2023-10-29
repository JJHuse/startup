function place_username(){
    let username = localStorage.userName;
    if (username.trim() !== ''){
        let nameEl = document.getElementById('profile_name');
        nameEl.textContent = username;
    }
}

function place_name(myname, namebox){
    textElement = document.createTextNode('Name: ' + myname);
    namebox.parentNode.replaceChild(textElement, namebox);
    localStorage.setItem('myname', myname)
}

function setup_name(){
    stored = localStorage.getItem('myname');
    if (stored !== null){
        place_name(stored, document.getElementById('nameBox'))
    }
}

function name_listening() {document.getElementById("nameBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById("nameBox");
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        place_name(inputText, inputBox)
      }
    }
});
}

function place_email(email, emailbox){
    textElement = document.createTextNode('Email: ' + email);
    emailbox.parentNode.replaceChild(textElement, emailbox);
    localStorage.setItem('email', email)
}

function setup_email(){
    stored = localStorage.getItem('email');
    if (stored !== null){
        place_email(stored, document.getElementById('emailBox'))
    }
}

function email_listening() {document.getElementById("emailBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById("emailBox");
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        place_email(inputText, inputBox)
      }
    }
});
}

place_username();

setup_name();
const namebox = document.getElementById('nameBox')
if (namebox !== null){ name_listening(); }

setup_email();
const emailbox = document.getElementById('emailBox')
if (emailbox !== null){ email_listening(); }