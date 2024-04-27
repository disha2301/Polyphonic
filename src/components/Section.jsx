import React, { useState } from "react";

const Section = ({ text, setText, convertTextToSpeech }) => {
  const [wordCount, setWordCount] = useState(0);

  const handleConvertToUppercase = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleConvertToLowercase = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClearText = () => {
    setText("");
    setWordCount(0);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
  };

  const handleRemoveExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    updateWordCount(newText);
  };

  const handleConvertToSpeech = () => {
    convertTextToSpeech();
  };

  const handleTextPreview = () => {
    // Logic to display text preview (e.g., first 50 characters)
    return text.slice(0, 50);
  };

  const updateWordCount = (text) => {
    const words = text.split(/\s+/).filter((element) => element.length !== 0);
    setWordCount(words.length);
  };

  const calculateReadTime = () => {
    const wordsPerMinute = 200; // Average reading speed in words per minute
    const words = text.split(/\s+/).filter((element) => element.length !== 0);
    const minutes = words.length / wordsPerMinute;
    return minutes.toFixed(2); // Return estimated reading time formatted to 2 decimal places
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
    updateWordCount(event.target.value);
  };

  return (
    <div className="section-container">
      <textarea
        value={text}
        onChange={handleOnChange}
        className="form-control"
        rows="8"
      />
      <div className="btn-container">
        <button className="btn btn-convert" onClick={handleConvertToSpeech}>
          Convert to Speech
        </button>
        <button
          className="btn btn-primary"
          onClick={handleConvertToUppercase}
          disabled={!text.trim()}
        >
          Convert to Uppercase
        </button>
        <button
          className="btn btn-primary"
          onClick={handleConvertToLowercase}
          disabled={!text.trim()}
        >
          Convert to Lowercase
        </button>
        <button
          className="btn btn-primary"
          onClick={handleClearText}
          disabled={!text.trim()}
        >
          Clear Text
        </button>
        <button
          className="btn btn-primary"
          onClick={handleCopyText}
          disabled={!text.trim()}
        >
          Copy Text
        </button>
        <button
          className="btn btn-primary"
          onClick={handleRemoveExtraSpaces}
          disabled={!text.trim()}
        >
          Remove Extra Spaces
        </button>
      </div>
      <div className="preview-container">
        <h2>Text Preview:</h2>
        <p>{text.length > 0 ? handleTextPreview() : "Nothing to preview"}</p>
        <h2>Text Summary:</h2>
        <p>
          {wordCount} words | {text.length} characters
        </p>
        <p>Estimated read time: {calculateReadTime()} minutes</p>
      </div>
    </div>
  );
};

export default Section;
