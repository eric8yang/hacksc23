import React from "react";
import './transcript.css'
import downloadButton from '../images/download-button.svg'

const Transcript = (text) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="transcript">
      {text}
      <button className='download-button' onClick={handleDownload}>
        <img className='download-image' src={downloadButton} />
      </button>
    </div>
  );
};

export default Transcript;