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
  const [isSaved, setIsSaved] = useState(false)
  const auth = getAuth();
  const user = auth.currentUser;

  const startRecording = () => {
    SpeechRecognition.startListening();
  }

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  }


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span> Browser doesn't support speech recognition </span>;
  }

  const summarize = async () => {
    const payload = {
      transcript: transcript,
    }
    axios
      .post('http://localhost:3001/api/summarize', payload)
      .then((resp) =>
        setSummary(resp.data))
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

      setIsSaved(true)
    })
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'} </p>
      <button className='button' onClick={startRecording}>Start</button>
      <button className='primary-btn' onClick={stopRecording}>Stop</button>
      <button className='secondary-btn' onClick={resetTranscript}>Reset</button>
      <button onClick={saveText}>Save Text</button>
      <button onClick={summarize}>Summarize</button>
      {isSaved && <p>Your file has successfully been saved!</p>}
      <div>
        <ReactMic
          record={listening}
          className="sound-wave"
          strokeColor="#000000"
          backgroundColor="#FFFFFF" />
      </div>
      {Transcript(transcript)}
      {summary && Transcript(summary)}
    </div>
  );
};

export default SpeechDetection;
