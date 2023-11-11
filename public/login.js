async function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);

  try{
    const response = await fetch(`/api/person/${nameEl.value}`);
    const person = await response.json();
    window.location.href = "userpage.html";
  } catch {
    loginError();
  }
}
/*
function create_user() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "userpage.html";
 */
function loginError(){
  console.log("User not found")
  const error = document.createElement("nav");
  error.textContent = "User not found";
  error.classList.add("error");
  error.classList.add("login_nav")
  let login_box = document.querySelector("#loginregion");
  login_box.appendChild(error);
}
