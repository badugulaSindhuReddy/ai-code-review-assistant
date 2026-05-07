import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [review, setReview] = useState("");

  const reviewCode = async () => {
    const response = await fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code, language })
    });

    const data = await response.json();
    setReview(data.review || data.error);
  };

  return (
    <div className="container">
      <h1>AI-Powered Code Review Assistant</h1>
      <p>Paste your code and get AI-style review feedback.</p>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option>Python</option>
        <option>JavaScript</option>
        <option>TypeScript</option>
        <option>Java</option>
        <option>SQL</option>
      </select>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={reviewCode}>Review Code</button>

      {review && (
        <div className="result">
          <h2>Review Result</h2>
          <pre>{review}</pre>
        </div>
      )}
    </div>
  );
}
