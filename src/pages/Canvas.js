import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import Toolbox from "../components/Toolbox";
import BoardProvider from "../store/BoardProvider";
import ToolboxProvider from "../store/ToolboxProvider";

function CanvasPage() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const loadCanvas = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:4030/load/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCanvas(data);
      } catch (error) {
        console.error("Error loading canvas:", error);
      }
    };

    loadCanvas();
  }, [id]);

  if (!canvas) {
    return <div>Loading canvas...</div>;
  }

  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar />

        <Board />

        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default CanvasPage;
