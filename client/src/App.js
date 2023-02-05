import { React, useState } from "react";
import SpeechDetection from './components/speech-detect';
<<<<<<< HEAD
import Navbar from "./components/navbar";

 
const App = () => {
 return (
   <div className="App">
    {Navbar()}
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <h3>Header 3</h3>
    <h4>Header 4</h4>
    <p>Body Text</p>
    <SpeechDetection />
   </div>
 );
=======
import { auth } from './server/server';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './App.css';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>PROJECT TITLE</h1>
      </div>
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
>>>>>>> 5973c3bbf6340e27ac12528c561af3c28a84356f
};

export default App;