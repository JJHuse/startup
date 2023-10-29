function place_username(){
    let username = localStorage.userName;
    if (username.trim() !== ''){
        let nameEl = document.getElementById('profile_name');
        nameEl.textContent = username;
    }
}

place_username();