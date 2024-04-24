import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
function App() {
  const [text, setText] = useState("");
  return (
    <div className="container">
      <Header />
      <Section text={text} setText={setText} />
    </div>
  );
}

export default App;
