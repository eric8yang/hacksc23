import { React, useState } from "react";
import SpeechDetection from './components/speech-detect';
import { auth } from './server/server';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { SavedFiles } from './components/saved-files';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setToken(credential.accessToken);
        setUser(result.user);
      });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <div className="App">
        <SavedFiles />
      <SpeechDetection />
      <div className="logInOut">
        {!user ? <button onClick={logIn}>Sign In</button>
          : <>
            <p>{user.email}</p>
            <button onClick={logOut}>Log Out</button>
          </>}
      </div>
    </div>
  );
};

export default App;