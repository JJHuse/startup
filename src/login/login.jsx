import React from 'react';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';

export function Login({ username, authState, onAuthChange }) {
  return (
    <main id="home-main">
        <section id="logo">
            <img src="Vision_ready.jpg" alt="Vision logo"/>
        </section>
        <div>
            {authState === AuthState.Authenticated && (
            <Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
            <Unauthenticated
                username={username}
                onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
                }}
            />
            )}
        </div>
    </main>
  );
}