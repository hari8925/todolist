// src/TodoList.js
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            id: todos.length + 1,
            title: newTodo,
            completed: false,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="container d-flex  mt-3">
        <img
          className=" mt-5 mx-auto  rounded"
          src="https://cdn.pixabay.com/photo/2014/03/25/16/28/todo-list-297195_1280.png"
          style={{ width: "100px" }}
          alt=""
        />
      </div>

      <h1 className="mb-4 text-center">
        Todo <span className="text-primary">List</span>
      </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button className="btn btn-outline-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className=" list-group-item shadow mb-3 d-flex justify-content-between align-items-center">
            <p className="text-center text-success " key={todo.id}>
              {todo.title}
            </p>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
