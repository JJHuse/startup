import React from 'react';

export function Login() {
  return (
    <main id="home-main">
        <section id="logo">
            <img src="Vision_ready.jpg" alt="Vision eye"/>
        </section>
        <section id="loginregion">
            <nav className="login_nav">
                <input type="text" id="username" placeholder="Username"/>
            </nav>
            <nav className="login_nav">
                <input type="password" id="password" placeholder="Password"/>
            </nav>
            <nav className="login_nav" id="loginbuttons">
                <button className="underbutton" id="underbutton1" onclick="login()">Log In</button>
                <button className="underbutton" id="underbutton2" onclick="create_user()">Create</button>
            </nav>
        </section>
    </main>
  );
}