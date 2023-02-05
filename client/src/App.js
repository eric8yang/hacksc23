import React from "react";
import './components/text.css'
// We use Route in order to define the different routes of our application
 
// We import all the components we need in our app

import SpeechDetection from './components/speech-detect';
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
};
 
export default App;