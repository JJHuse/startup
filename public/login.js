const thingSet = new Set(['name', 'email']);
const listSet = new Set(['vision_list', 'subtask_list', 'idea_list']);

async function bring_local(){
  debugger;
  const response = await fetch(`/api/person/${localStorage.userName}`)
  const data = await response.json()
  if (Object.keys(data).length > 0){
      for (let key in data) {
          if (thingSet.has(key)){
              localStorage.setItem(key, data[key]);
          }
          else if(listSet.has(key)){
              localStorage.setItem(key, JSON.stringify(data[key]));
          }
      } 
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
  debugger;
  const nameEl = document.querySelector("#username");

  try{
    //FIXME: this fetch
    const response = await fetch(`/api/person/${nameEl.value}`);
    const person = await response.json();
    localStorage.setItem("userName", nameEl.value);
    bring_local();
    window.location.href = "userpage.html";
  } catch {
    loginError();
  }
}

async function create_user() {
  const nameEl = document.querySelector("#username");
  try{
    const response = await fetch('/api/person', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: `{"id":"${nameEl.value}"}`,
    });
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "userpage.html";
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
