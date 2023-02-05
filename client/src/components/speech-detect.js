import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { storage, ref, auth } from '../server/server';
import { uploadString, updateMetadata } from "@firebase/storage";
import { getAuth } from "firebase/auth";
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
  const auth = getAuth();
  const user = auth.currentUser;

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
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  const summarize = async () => {
    const payload = {
      transcript: transcript,
    }
    axios
      .post('http://localhost:3001/api/summarize', payload)
      .then(() => console.log('Book Created'))
      .catch(err => {
        console.error(err);
      });
  };

  const saveText = () => {
    console.log("This function is running");
    var summarizedText = transcript;
    console.log(summarizedText)
    var fileName = "summarized_text_" + new Date().getTime() + ".txt";
    console.log(user);
    var fileRef = ref(storage, String(user.uid) + "/summarizedTexts/" + fileName);

    uploadString(fileRef, summarizedText).then((snapshot) => {
      console.log("Summarized text stored as text file: " + fileName);
      const metadata = {
        customMetadata: {
          'uid': user.uid,
        }
      };
      console.log(user.uid);
      updateMetadata(fileRef, metadata)
        .then((metadata) => {
          console.log("successfully updated metadata")
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
    })
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
