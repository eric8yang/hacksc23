import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SpeechDetection from './components/speech-detect';
import { auth } from './server/server';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { SavedFiles } from './components/saved-files';
import './App.css';
import note from './images/note.svg'

const App = () => {
  const [user, setUser] = useState(null);
  const logIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
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
      <BrowserRouter>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>AudioNote</h1>
            <img style={{ height: '40px', width: '40px' }} src={note} />
          </div>
        </Link>

        <div className="logInOut">
          {!user ? <button onClick={logIn}>Sign In</button>
            : <>
              <p>{user.email}</p>
              <Link to='/saved'>
                <button className='saved'>Saved Files</button>
              </Link>
              <button onClick={logOut}>Log Out</button>
            </>}
        </div>
        <Routes>
          <Route path="/" element={<SpeechDetection />}></Route>
          <Route path="/saved" element={<SavedFiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;