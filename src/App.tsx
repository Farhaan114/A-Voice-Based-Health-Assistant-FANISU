import { useState } from "react";
import "./App.css";
import backgroundImage from "./assets/Fanisu.png";


function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcriptText, setTranscript] = useState("");
  const [remedyText, setRemedyText] = useState("");

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="container" style={backgroundStyle}>
      <button

        style={{
          background: "black",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "5px",
          }}

        onClick={async () => {
          const voiceRecog = new window.webkitSpeechRecognition();
          voiceRecog.continuous = true;
          voiceRecog.onresult = (eV) => {
            setTranscript(eV.results[0][0].transcript);
          };

          if (!recordingState) {
            voiceRecog.start();
            setRecordingState(true);
          } else {
            voiceRecog.stop();
            setRecordingState(false);
            const responseData = await (
              await fetch("http://127.0.0.1:5000/transcript", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Request-Method": "POST",
                },
                body: JSON.stringify({
                  transcriptText,
                }),
              })
            ).json();

            setRemedyText(responseData[2]);
          }
        }}
      >
        {recordingState ? "Stop Recording" : "Start Recording"}
      </button>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Your Symptom: {transcriptText}</p>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Remedy: {remedyText}</p>
    </div>
  );
}

export default App;
