import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";
import axios from "axios";
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { storage, ref } from '../server/server';
import { uploadString } from "@firebase/storage";
import Transcript from "./transcript";
import './button.css';

const SpeechDetection = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition  
     } = useSpeechRecognition({
      continuous: true
    });

    const [summary, setSummary] = useState(null);
    const [recording, setRecording] = useState(null)

    const startRecording = () => {
      setRecording(true);
      SpeechRecognition.startListening();
    }
   
    const stopRecording = () => {
      setRecording(false);
      SpeechRecognition.stopListening();
    }

   
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

    const summarize = async () => {
        const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ${process.env.REACT_APP_OPENAI_KEY}"
        },
        body: JSON.stringify({
            prompt: transcript,
            max_tokens: 50
        })
        });

        const data = await response.json();
        setSummary(data.choices[0].text);
    };

    const saveText = () => {
        console.log("This function is running");
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
        <button className='button' onClick={startRecording}>Start</button>
        <button className='primary-btn' onClick={stopRecording}>Stop</button>
        <button className='secondary-btn' onClick={resetTranscript}>Reset</button>
        <button className='tertiary-btn' onClick={handleDownload}>Download</button>
        <button onClick={saveText}>Save Text</button>
        <button onClick={summarize}>Summarize</button>
        <div>
          <ReactMic
            record={listening}
            className="sound-wave"
            strokeColor="#000000"
            backgroundColor="#FFFFFF" />
        </div>
        {Transcript(transcript)}
        {summary && <p>Summary: {summary}</p>}
      </div>
    );
  };

export default SpeechDetection;
