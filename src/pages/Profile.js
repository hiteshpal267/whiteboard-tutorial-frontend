import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [name, setName] = useState("");
  const [canvases, setCanvases] = useState([]);
  const [newCanvasName, setNewCanvasName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem("token");

      // Fetch profile
      const profileResponse = await fetch("http://localhost:4030/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const profileData = await profileResponse.json();
      setName(profileData.user.name);

      // Fetch canvases
      const canvasResponse = await fetch("http://localhost:4030/canvas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const canvasData = await canvasResponse.json();
      setCanvases(canvasData);

    };

    fetchData();

  }, []);

  const handleCreateCanvas = async () => {

    if (!newCanvasName.trim()) {
      alert("Please enter a canvas name");
      return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4030/canvas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newCanvasName
      })
    });

    const createdCanvas = await response.json();

    setCanvases([...canvases, createdCanvas]);
    setNewCanvasName("");

  };

  const openCanvas = (id) => {
    navigate(`/canvas/${id}`);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1 style={{ textAlign: "center" }}>Hello, {name} 👋</h1>

      {/* Create Canvas */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>

        <input
          type="text"
          placeholder="Enter canvas name"
          value={newCanvasName}
          onChange={(e) => setNewCanvasName(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleCreateCanvas}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Create Canvas
        </button>

      </div>

      <h2 style={{ marginTop: "50px" }}>Your Canvases</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>

        {canvases.map((canvas) => (
          <div
            key={canvas._id}
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{canvas.name}</h3>

            <p>Created: {new Date(canvas.createdAt).toLocaleDateString()}</p>
            <p>Public: {canvas.is_public ? "Yes" : "No"}</p>

            <button
              onClick={() => openCanvas(canvas._id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Open Canvas
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Profile;