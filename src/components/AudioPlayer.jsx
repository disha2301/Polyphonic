import { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsPauseCircleFill } from "react-icons/bs";
import { BiSolidDownload } from "react-icons/bi";

const AudioPlayer = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressBarRef = useRef();

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioFile && audioFile.AudioStream && audioFile.AudioStream.buffer) {
      const audioArrayBuffer = audioFile.AudioStream.buffer;
      const audioURL = URL.createObjectURL(
        new Blob([audioArrayBuffer], { type: "audio/mpeg" })
      );

      const audio = audioRef.current;
      audio.src = audioURL;
      audio.addEventListener("loaddata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", updateProgressBar);

      return () => {
        URL.revokeObjectURL(audioURL);
      };
    }
  }, [audioFile]);
  const updateProgressBar = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;
    setCurrentTime(audio.currentTime);
    progressBarRef.current.style.width = `${progress}%`;
  };
  const downloadAudio = () => {
    if (audioFile) {
      const audioArrayBuffer = audioFile.AudioStream.buffer;
      const audioURL = URL.createObjectURL(
        new Blob([audioArrayBuffer], { type: "audio/mpeg" })
      );
      const a = document.createElement("a");
      a.href = audioURL;
      a.download = "audio.mp3";
      a.style.display = "none";
      document.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(audioURL);
    }
  };

  return (
    <div className="audio-container">
      <audio ref={audioRef} controls />{" "}
      <div className="progress-container">
        <div
          ref={progressBarRef}
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      {/* Use controls for default audio player controls */}
      <button
        className="audio-button"
        disabled={!audioFile}
        onClick={() => togglePlay()}
      >
        {isPlaying ? (
          <BsPauseCircleFill className="icon-btn" />
        ) : (
          <AiFillPlayCircle className="icon-btn" />
        )}
      </button>
      <button
        className="audio-button"
        disabled={!audioFile}
        onClick={() => downloadAudio()}
      >
        <BiSolidDownload className="icon-btn" />
      </button>
    </div>
  );
};

export default AudioPlayer;
