import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import { Login } from './login/login';
import { Profile} from './profile/profile';
import { Info } from './info/info';
import { Partner } from './partner/partner';
import { AuthState } from './login/authState';

export default function App() {
  const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  function logout(username) {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
    .finally(() => {
        localStorage.clear();
        setAuthState(AuthState.Unauthenticated);
        setUserName(username);
        window.location.href = '/';
    });
  }
  return <BrowserRouter>
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
          <NavLink className="top-right topbar-link" onClick={()=>logout(username)}>Log out</NavLink>
      </nav>
    </header>
    <div id="charybdis" className='body'>
      <Routes>
        {authState === AuthState.Authenticated && (
        <Route path='/profile' element={<Profile />}/>
        )}
        {authState === AuthState.Authenticated && (
        <Route authState={authState} path='/info' element={<Info />} />
        )}
        {authState === AuthState.Authenticated && (
        <Route authState={authState} path='/partner' element={<Partner />} />
        )}
        <Route
          path='/'
          element={
            <Login
              username={username}
              authState={authState}
              onAuthChange={(username, authState) => {
                setAuthState(authState);
                setUserName(username);
              }}
            />
          }
          exact
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <footer>
          <span className="text-reset">Ethan G Smith</span>
          <a href="https://github.com/JJHuse/startup">GitHub</a>
      </footer>
      </div>
    </BrowserRouter>;
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}