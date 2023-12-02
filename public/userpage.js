class Profile {
    socket;

    constructor() {
        this.configureWebSocket();
    }
    place_username(){
        let username = localStorage.username;
        if (username.trim() !== ''){
            let nameEl = document.getElementById('profile_name');
            nameEl.textContent = username;
        }
    }


    add_idea(idea) {
        let listItem = document.createElement("li");
        listItem.textContent = idea;

        let ul = document.getElementById("ideaList");
        const items = ul.getElementsByTagName('li')
        const where = items[items.length - 1]
        ul.insertBefore(listItem, where);
    }

    setup_idealist(){
        const stored = localStorage.getItem('idea_list');
        if (stored !== null){
            let stored_list = JSON.parse(stored)
            stored_list.forEach(this.add_idea)
        }
    }

    idea_listening() {document.getElementById("ideaBox").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default behavior of the Enter key in the input box
    
        let inputBox = document.getElementById("ideaBox");
        let inputText = inputBox.value;
    
        if (inputText.trim() !== "") {
            this.add_idea(inputText)

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


    today(){
        const today = new Date();

        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const day = today.getDate().toString().padStart(2, '0');

        return year + "-" + month + "-" + day;

    }
    set_date(){
        const date = this.today();
        const today_element = document.getElementById('today')
        today_element.textContent = 'TODAY: ' + date;
    }


    add_progress_element(subtask){
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
                this.broadcastEvent(localStorage.username, subtask);
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
    setup_progress(){
        let stored = localStorage.getItem('subtask_list');
        if (stored !== null){
            const placeholder = document.getElementById('progress_placeholder')
            placeholder.parentNode.removeChild(placeholder)
            let stored_list = JSON.parse(stored)
            stored_list.forEach(this.add_progress_element)
        }
    }
    displayQuote() {
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

    configureWebSocket() {
        const protocol = 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        // this.socket.onopen = (event) => {
        //   this.displayMsg('system', 'game', 'connected');
        // };
        // this.socket.onclose = (event) => {
        //   this.displayMsg('system', 'game', 'disconnected');
        // };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          this.beNotified(msg.from, msg.value);
        };
      }
    
      beNotified(from, msg) {
        const notifications = document.querySelector('.dropdown-content');
        notifications.innerHTML =
          `<a>${from} just accomplished this daily task: ${msg}</a>` + notifications.innerHTML;
      }
    
      broadcastEvent(from, value) {
        const event = {
          from: from,
          type: 'taskNotification',
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
}

const profile = new Profile();


profile.place_username();

profile.setup_idealist();
profile.idea_listening();

profile.set_date();

profile.setup_progress();
profile.displayQuote();
  