import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  marginTop: "100px",
  fontFamily: "Arial"
}}>
  <h1>AI Blog Generator 🚀</h1>

  <input
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder="Enter topic..."
    style={{
      padding: "12px",
      width: "300px",
      borderRadius: "8px",
      border: "1px solid #ccc"
    }}
  />

  <button 
    onClick={generate}
    style={{
      marginTop: "10px",
      padding: "12px 20px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Generate
  </button>

  <div style={{
    marginTop: "20px",
    width: "60%",
    whiteSpace: "pre-line",
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px"
  }}>
    {result}
  </div>
</div>
  );
}

export default App;