import React from "react";
import { useWhisper } from "@chengsokdara/use-whisper";

const SpeechToTextNew: React.FC = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Ensure this environment variable is defined
  });

  console.log(transcript);

  return (
    <div>
      <p>Recording: {recording ? "Yes" : "No"}</p>
      <p>Speaking: {speaking ? "Yes" : "No"}</p>
      <p>Transcribing: {transcribing ? "Yes" : "No"}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
};

export default SpeechToTextNew;
