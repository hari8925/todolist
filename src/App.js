import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="todo" element={<TodoList />} />
        <Route path="home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
