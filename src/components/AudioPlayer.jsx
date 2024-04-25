import { useEffect } from "react";

const AudioPlayer = ({ audioFile }) => {
  useEffect(() => {
    if (audioFile) {
      const AudioArrayBuffer = audioFile.AudioStream.buffer;
      blob:http://localhost:3000/
    }
  }, [audioFile]);
  return (
    <div>
      <audio />
    </div>
  );
};
export default AudioPlayer;
