// import Board from "./components/Board";
// import Toolbar from "./components/Toolbar";
// import Toolbox from "./components/Toolbox";
// import BoardProvider from "./store/BoardProvider";
// import ToolboxProvider from "./store/ToolboxProvider";
// import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import CanvasPage from "./pages/Canvas.js";   // ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADD THIS ROUTE */}
        <Route
          path="/canvas/:id"
          element={
            <ProtectedRoute>
              <CanvasPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


// const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:4030/api/register")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);



 // <BoardProvider>
    //   <ToolboxProvider>
    //     <Toolbar />
    //     <Board />
    //     <Toolbox />
    //   </ToolboxProvider>
    // </BoardProvider>
