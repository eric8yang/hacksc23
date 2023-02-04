import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";
   
const SpeechDetection = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition  
     } = useSpeechRecognition({
      continuous: true
    });
   
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return <span> Browser doesn't support speech recognition </span>;
    }
   
    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'} </p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    );
  };

export default SpeechDetection;
