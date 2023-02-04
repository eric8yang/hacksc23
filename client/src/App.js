import React from "react";
 
// We use Route in order to define the different routes of our application
 
// We import all the components we need in our app

import SpeechDetection from './components/speech-detect';
import Auth from './components/auth';
 
const App = () => {
 return (
   <div className="App">
    <SpeechDetection />
    <button onClick={Auth}>Sign In</button>
   </div>
 );
};
 
export default App;