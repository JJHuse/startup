function place_username(){
    let username = localStorage.username;
    if (username.trim() !== ''){
        let nameEl = document.getElementById('profile_name');
        nameEl.textContent = username;
    }
}


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
        fetch(`/api/person/${localStorage.username}/attribute`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ attribute: 'idea_list', value: updatedListString })
        });

  
        inputBox.value = ""; // Clear the input box
      }
    }
});
}


function today(){
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return year + "-" + month + "-" + day;

}
function set_date(){
    date = today();
    today_element = document.getElementById('today')
    today_element.textContent = 'TODAY: ' + date;
}


function add_progress_element(subtask){
    let listItem = document.createElement("li");

    const checkbox_child = document.createElement('span');
    let checked = localStorage.getItem(subtask);
    if (checked === null){
        checked = 'false';
        localStorage.setItem(subtask, false)
    }
    if (checked === 'false'){checkbox_child.className = 'mycheckbox_default';}
    else {checkbox_child.className = 'mycheckbox_checked';}

    checkbox_child.style.display = 'inline';
    checkbox_child.addEventListener('click', function(){
        if (localStorage.getItem(subtask) === 'true'){
            localStorage.setItem(subtask,false);
            fetch(`/api/person/${localStorage.username}/attribute`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ attribute: subtask, value: false })
            });
            this.className = 'mycheckbox_default';
        }
        else{
            localStorage.setItem(subtask,true);
            fetch(`/api/person/${localStorage.username}/attribute`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ attribute: subtask, value: true })
            });
            this.className = 'mycheckbox_checked';
        }
    })
    listItem.appendChild(checkbox_child);
    const subtask_child = document.createElement('span');
    subtask_child.textContent = subtask;
    listItem.appendChild(subtask_child)


    let ul = document.getElementById("progressList");
    const items = ul.getElementsByTagName('li')
    if (items.length === 0){
        ul.appendChild(listItem)
    }
    else {
        const where = items[items.length - 1]
        ul.insertBefore(listItem, where);
    }
}
function setup_progress(){
    stored = localStorage.getItem('subtask_list');
    if (stored !== null){
        const placeholder = document.getElementById('progress_placeholder')
        placeholder.parentNode.removeChild(placeholder)
        stored_list = JSON.parse(stored)
        stored_list.forEach(add_progress_element)
    }
}
function displayQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
}

place_username();

setup_idealist();
idea_listening();

set_date();

setup_progress();
displayQuote();
  