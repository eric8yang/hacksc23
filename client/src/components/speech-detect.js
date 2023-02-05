import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { storage, ref } from '../server/server';
import { uploadString } from "@firebase/storage";
import { call } from '../server/openai';

const SpeechDetection = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition  
     } = useSpeechRecognition({
      continuous: true
    });
    
    const [completion, setCompletion] = useState('');

   
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return <span> Browser doesn't support speech recognition </span>;
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([transcript], {type: "text/plain"});
        element.href = URL.createObjectURL(file);
        element.download = "transcript.txt";
        document.body.appendChild(element);
        element.click();
    };

    const fetchCompletion = async () => {
        const response = await fetch('http://localhost:8000/completion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'Hello, my name is' }),
          });
      
          const data = await response.json();
          setCompletion(data.completion);
     };

    const saveText = () => {
        var summarizedText = transcript;
        console.log(summarizedText)
        var fileName = "summarized_text_" + new Date().getTime() + ".txt";
        var fileRef = ref(storage, "summarizedTexts/" + fileName);   

        uploadString(fileRef, summarizedText).then((snapshot) => {
                  console.log("Summarized text stored as text file: " + fileName);
                }).catch(function(error) {
                  console.error("Error storing summarized text as text file: " + error);
        });
    };
   
    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'} </p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={saveText}>Save Text</button>
        <button onClick={fetchCompletion}>Summarize</button>
        <p>{transcript}</p>
        <p>{completion}</p>
      </div>
    );
  };

export default SpeechDetection;
