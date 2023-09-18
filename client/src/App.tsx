import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<h1>Tasks</h1>} />
        <Route path="/add-tasks" element={<h1>nw Tasks</h1>} />
        <Route path="/tasks/:id" element={<h1>update task</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
