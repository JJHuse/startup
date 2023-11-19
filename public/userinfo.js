function place_username(){
    let username = localStorage.username;
    if (username.trim() !== ''){
        let nameEl = document.getElementById('profile_name');
        nameEl.textContent = username;
    }
}

function place_thing(text, box, which){
    const cap = which.charAt(0).toUpperCase() + which.slice(1);
    textElement = document.createTextNode(cap + ": " + text);
    box.parentNode.replaceChild(textElement, box);
    localStorage.setItem(which, text)
}
function setup_thing(which){
    stored = localStorage.getItem(which);
    if (stored !== null){
        const box = which + 'Box'
        place_thing(stored, document.getElementById(box), which)
    }
}
function thing_listening(which) {
    const box = which + 'Box';
    document.getElementById(box).addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById(box);
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        place_thing(inputText, inputBox, which)
        fetch(`/api/person/${localStorage.username}/attribute`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: `{"attribute":"${which}", "value":"${inputText}"}`,
        });
      }
    }
});
}

function add_vision(vision) {
    let listItem = document.createElement("li");
    listItem.textContent = vision;

    let ol = document.getElementById("visionList");
    const items = ol.getElementsByTagName('li')
    const where = items[items.length - 1]
    ol.insertBefore(listItem, where);
}
function add_subtask(subtask){
    let listItem = document.createElement("li");
    listItem.textContent = subtask;

    let ol = document.getElementById("subtaskList");
    const items = ol.getElementsByTagName('li')
    const where = items[items.length - 1]
    ol.insertBefore(listItem, where);
}

function setup_list(which){
    const list = which + '_list';
    stored = localStorage.getItem(list);
    if (stored !== null){
        const stored_list = JSON.parse(stored);
        if (which === 'vision'){stored_list.forEach(add_vision);}
        else if (which === 'subtask'){stored_list.forEach(add_subtask);}
    }
}
function list_listening(which) {
    const box = which + 'Box';
    const list = which + '_list'
    document.getElementById(box).addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
  
      let inputBox = document.getElementById(box);
      let inputText = inputBox.value;
  
      if (inputText.trim() !== "") {
        if (which === 'vision'){add_vision(inputText)}
        else if (which === 'subtask'){add_subtask(inputText)}

        const storedListString = localStorage.getItem(list);
        // Deserialize the string to get the existing list (or initialize an empty array if it doesn't exist)
        let storedList = storedListString ? JSON.parse(storedListString) : [];
        storedList.push(inputText);
        const updatedListString = JSON.stringify(storedList);
        localStorage.setItem(list, updatedListString);
        fetch(`/api/person/${localStorage.username}/attribute`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ attribute: list, value: updatedListString })
        });

  
        inputBox.value = ""; // Clear the input box
      }
    }
});
}

const thingSet = new Set(['name', 'email']);
const listSet = new Set(['vision', 'subtask']);

place_username();

for (let thing of thingSet){
    setup_thing(thing);
    const box = document.getElementById(thing + 'Box')
    if (box !== null){ thing_listening(thing); }
}
for (let list of listSet){
    setup_list(list);
    list_listening(list);
}
