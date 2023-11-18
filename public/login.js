const thingSet = new Set(['name', 'email']);
const listSet = new Set(['vision_list', 'subtask_list', 'idea_list']);

async function bring_local(){
  console.log('bring_local');
  const response = await fetch(`/api/person/${localStorage.userName}`);
  console.log('brought local');
  const data = await response.json();
  console.log('data awaited');
  if (Object.keys(data).length > 0){
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
      console.log('data: ', data);
      console.log('response: ', response)
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
  const nameEl = document.querySelector("#username");

  try{
    //FIXME: this fetch
    // const response = await fetch(`/api/person/${nameEl.value}`);
    // const person = await response.json();
    localStorage.setItem("userName", nameEl.value);
    console.log('Going to bring local');
    await bring_local();
    console.log('Done bringing local');
    window.location.href = "userpage.html";
  } catch {
    console.log('login catch');
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
