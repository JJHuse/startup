import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Profile} from './profile/profile';
import { Info } from './info/info';
import { Partner } from './partner/partner';
import { AuthState } from './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return <BrowserRouter>
    <div id="charybdis" className='body'>
      <header>
          <nav className="header-nav">
              <table className="topbar">
                  <td>
                      <NavLink className="topbar-link" to='profile'>Profile</NavLink>
                  </td>
                  <td className="dropdown">
                      <div className="topbar-link">Notifications</div>
                      <div className="dropdown-content">
                          <NavLink to='partner'>Granddaddy Space inspired someone today!</NavLink>
                      </div>
                  </td>
              </table>
              <NavLink className="top-right topbar-link" onclick="logout();">Log out</NavLink>
          </nav>
      </header>
      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/info' element={<Info />} />
        <Route path='/partner' element={<Partner />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <footer>
          <span className="text-reset">Ethan G Smith</span>
          <NavLink href="https://github.com/JJHuse/startup">GitHub</NavLink>
      </footer>
      </div>
    </BrowserRouter>;
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}