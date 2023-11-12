async function login() {
  const nameEl = document.querySelector("#username");

  try{
    const response = await fetch(`/api/person/${nameEl.value}`);
    const person = await response.json();
    localStorage.setItem("userName", nameEl.value);
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
