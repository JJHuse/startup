let username = localStorage.userName;
let nameEl = document.getElementById('profile_name');
nameEl.textContent = username;

document.getElementById("ideaBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById("ideaBox");
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = inputText;
  
        let ul = document.getElementById("ideaList");
        ul.insertBefore(listItem, inputBox.parentNode);
  
        inputBox.value = ""; // Clear the input box
      }
    }
  });
  