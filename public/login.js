/*async */function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "userpage.html";
  /*
  try {
    const response = await fetch(`/api/person/${nameEl.value}`);
    const person = await response.json();
  }
  */
}
