import React from 'react';

// Todo: CSS organizing

export function Authenticated(props) {
    function logout() {

        fetch(`/api/auth/logout`, {
          method: 'delete',
        }).then(() => (window.location.href = '/'))
        .finally(() => {
            localStorage.clear();
            props.onLogout();
        });
    }

    return (
        <nav className="login_nav" id="loginbuttons">
            <button className="underbutton1 underbutton2" id="logged_in" onClick={()=>logout()}>
                Log out
            </button>
        </nav>
    )

}