import React from 'react';
import { app } from '../server/server';
import { auth, provider } from '../server/server';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//     let history = useNavigate();

    const Auth = () => {
        // firebase
        //     .signInWithRedirect(auth, provider)
        //     .then(() => {
        //         history('/home');
        // })
        //     .catch(function(error) {
        //         console.error("Login failed: ", error.message);
        //     });
        signInWithPopup(auth, new GoogleAuthProvider());
    };

    // return (
    //     <div>
    //     <button onClick={userCred}>Login</button>
    //     </div>
    // );
    //     };
// };

export default Auth;