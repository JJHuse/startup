const thingSet = new Set(['name', 'email']);
const listSet = new Set(['vision_list', 'subtask_list', 'idea_list']);

async function bring_local(username, password){
  console.log('bring_local');
  const response = await fetch('/api/person/', {
    method: 'post',
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok){
    throw new Error('User not found');
  }
  const data = await response.json();
  if (Object.keys(data).length > 0){
    localStorage.setItem("userName", username)
    for (let key in data) {
        if (thingSet.has(key)){
            localStorage.setItem(key, data[key]);
        }
        else if(listSet.has(key)){
            localStorage.setItem(key, JSON.stringify(data[key]));
        }
    } 
  } else {
      console.log('No data keys');
  };

  // Convert stringified lists back to arrays
  listSet.forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      localStorage.setItem(key, JSON.parse(item));
    }
  });
}

async function login() {
  const username = document.querySelector("#username")?.value;
  const password = document.querySelector("#password")?.value;

  if (username.trim() === "" || password.trim() === "") {
    loginError('Enter username and password');
    return;
  }

  try{
    console.log('Going to bring local');
    await bring_local(username, password);
    console.log('Done bringing local');
    window.location.href = "userpage.html";
  } catch {
    console.log('login catch');
    loginError();
  }
}

async function create_user() {
  const username = document.querySelector("#username")?.value;
  const password = document.querySelector("#password")?.value;

  if (username.trim() === "" || password.trim() === "") {
    loginError('Enter username and password');
    return;
  }

  try{
    const response = await fetch('/api/person', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.ok){
      localStorage.setItem("username", username);
      window.location.href = "userpage.html";
    }
  }
  catch{
    loginError('Problem creating user');
  }
}
function loginError(msg='User not found'){
  console.log(msg)
  const error = document.createElement("nav");
  error.textContent = msg;
  error.classList.add("error");
  error.classList.add("login_nav")
  let login_box = document.querySelector("#loginregion");
  login_box.appendChild(error);
}
