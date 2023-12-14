import React from 'react';
import './app.css';

export default function App() {
  return <div id="charybdis" className='body'>
    <header>
        <nav class="header-nav">
            <table class="topbar">
                <td>
                    <a class="topbar-link" href="userpage.html">Profile</a>
                </td>
                <td class="dropdown">
                    <div class="topbar-link">Notifications</div>
                    <div class="dropdown-content">
                        <a href="partnerpage.html">Granddaddy Space inspired someone today!</a>
                    </div>
                </td>
            </table>
            <a class="top-right topbar-link" onclick="logout();">Log out</a>
        </nav>
    </header>
    <main>App components here</main>
    <footer>
        <span class="text-reset">Ethan G Smith</span>
        <a href="https://github.com/JJHuse/startup">GitHub</a>
    </footer>
    </div>;
}