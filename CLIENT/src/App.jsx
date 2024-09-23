import { useState } from "react";
import axios from "axios";
import "./App.css";
import backgroundImage from "./assets/big_hero_6.png";

function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcriptText, setTranscript] = useState("");
  const [remedyText, setRemedyText] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle voice recording and transcription
  const handleVoiceRecording = async () => {
    const voiceRecog = new window.webkitSpeechRecognition();
    voiceRecog.continuous = true;

    // On receiving voice transcription
    voiceRecog.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    if (!recordingState) {
      voiceRecog.start();
      setRecordingState(true);
    } else {
      voiceRecog.stop();
      setRecordingState(false);

      // Fetch remedy once recording stops
      await fetchRemedy();
    }
  };

  // Function to fetch the remedy from the server
  const fetchRemedy = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/transcript", {
        transcriptText,
      });

      // Assuming remedyText is in the 3rd column of the response
      setRemedyText(response.data.remedy);
    } catch (error) {
      console.error("Error fetching remedy:", error);
      setRemedyText("Sorry, we could not find a remedy for your symptom.");
    }

    setLoading(false);
  };

  const buttonText = recordingState ? "Stop Recording" : "Start Recording";

  return (
    
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <button onClick={handleVoiceRecording}>{buttonText}</button>

      <p>Your Symptom: {transcriptText || "None"}</p>

      <p>Remedy: {loading ? "Loading..." : remedyText || "N/A"}</p>
    </div>
  );
}

export default App;
