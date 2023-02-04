import React from "react";
 
// We use Route in order to define the different routes of our application
 
// We import all the components we need in our app

import SpeechDetection from './components/speech-detect';
 
const App = () => {
 return (
   <div className="App">
     <SpeechDetection />
   </div>
 );
};
 
export default App;