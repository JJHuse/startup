function place_username(){
    let username = localStorage.userName;
    let nameEl = document.getElementById('profile_name');
    nameEl.textContent = username;
}

place_username();

function add_idea(idea) {
    let listItem = document.createElement("li");
    listItem.textContent = idea;

    let ul = document.getElementById("ideaList");
    const items = ul.getElementsByTagName('li')
    const where = items[items.length - 1]
    ul.insertBefore(listItem, where);
}

function setup_idealist(){
    stored = localStorage.getItem('idea_list');
    if (stored !== null){
        stored_list = JSON.parse(stored)
        stored_list.forEach(add_idea)
    }
}

function idea_listening() {document.getElementById("ideaBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById("ideaBox");
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        add_idea(inputText)

        const storedListString = localStorage.getItem("idea_list");
        // Deserialize the string to get the existing list (or initialize an empty array if it doesn't exist)
        let storedList = storedListString ? JSON.parse(storedListString) : [];
        storedList.push(inputText);
        const updatedListString = JSON.stringify(storedList);
        localStorage.setItem("idea_list", updatedListString);

  
        inputBox.value = ""; // Clear the input box
      }
    }
});
}

setup_idealist();
idea_listening();
  