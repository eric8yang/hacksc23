import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { storage, ref, auth } from '../server/server';
import { uploadString, updateMetadata, getDownloadURL } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import Transcript from "./transcript";
import './button.css';
import micOnImg from '../images/mic_on.png';
import micOffImg from '../images/mic_off.png';



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
  const [fileText, setFileText] = useState('');

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
      .then((resp) => {
        console.log(resp.data)
        setSummary(resp.data)
      })
      .catch(err => {
        console.error(err);
      });
  };

  const saveText = () => {
    setIsSaved(false)
    console.log("This function is running");
    var summarizedText = summary ? summary : transcript;
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

  const checkUrlFile = () => {
    const pathname = window.location.pathname;
    const fileName = pathname.split('/').pop();
    if (fileName) {
      return true;
    }
    else {
      return false;
    }
  };

  const getTextContents = () => {
    const filePath = window.location.pathname;
    const fileName = filePath.split('/').pop();
    const storageRef = ref(storage, fileName);
    console.log('filepath: ' + filePath);

    getDownloadURL(storageRef).then(function (filePath) {
      fetch(user.uid + '/summarizedTexts/' + filePath)
        .then(response => response.text())
        .then(text => {
          console.log(text);
          setFileText(text);
        });
    });
  };

  return (
    <div>
      <p>{listening ? 'Speaking' : 'Ready to Connect'} </p>
      <button className='secondary-btn' onClick={startRecording}>Start</button>
      <button className='primary-btn' onClick={stopRecording}>Stop</button>
      <button className='secondary-btn' onClick={resetTranscript}>Reset</button>
      <button className='secondary-btn' onClick={saveText}>Save Transcript</button>
      {isSaved && <p>Your file has successfully been saved!</p>}
      <div>
        <ReactMic
          record={listening}
          className="sound-wave"
          strokeColor="#000000"
          backgroundColor="#FFFFFF" />
      </div>
      {checkUrlFile() ?
        <div>
          {getTextContents()}
          {Transcript(fileText)}
        </div>
        :
        <div>
          {Transcript(transcript)}
        </div>
      }
      {/* <p>{user.uid}</p> */}
      {summary && Transcript(summary)}

      <button className='secondary-btn summarize' onClick={summarize}>Summarize</button>
    </div>
  );
};

export default SpeechDetection;
