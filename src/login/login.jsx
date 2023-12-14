import React from 'react';
import { Unauthenticated } from './unauthenticated';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main id="home-main">
        <section id="logo">
            <img src="Vision_ready.jpg" alt="Vision logo"/>
        </section>
        <Unauthenticated/>
    </main>
  );
}