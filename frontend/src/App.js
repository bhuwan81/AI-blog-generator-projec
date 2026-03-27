import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/generate"
      : "https://ai-blog-generator-projec.onrender.com/generate";

  const fetchWithRetry = async (retries = 3, delay = 3000) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) throw new Error("Server not ready");

      return await res.json();
    } catch (err) {
      if (retries === 0) throw err;

      setStatus("⏳ Waking up server... retrying");

      await new Promise((resolve) => setTimeout(resolve, delay));

      return fetchWithRetry(retries - 1, delay);
    }
  };

  const generate = async () => {
    if (!keyword) return;

    setLoading(true);
    setResult("");
    setStatus("🚀 Sending request...");

    try {
      const data = await fetchWithRetry();

      setResult(data.result);
      setStatus("✅ Done!");
    } catch (err) {
      setStatus("❌ Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Blog Generator 🚀</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter topic..."
        style={{
          padding: "12px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
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
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Generate"}
      </button>

      {status && (
        <p style={{ marginTop: "10px", color: "#555" }}>{status}</p>
      )}

      <div
        style={{
          marginTop: "20px",
          width: "60%",
          whiteSpace: "pre-line",
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "100px",
        }}
      >
        {loading ? "⏳ Please wait..." : result}
      </div>
    </div>
  );
}

export default App;