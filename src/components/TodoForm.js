// src/components/TodoForm.js

import React, { useState } from "react";


const TodoForm = ({ onAddTodo, editTodo, onUpdateTodo, onCancelEdit }) => {
  const [newTask, setNewTask] = useState("");

  // Jika editTodo berubah, update input
  React.useEffect(() => {
    if (editTodo) {
      setNewTask(editTodo.task);
    } else {
      setNewTask("");
    }
  }, [editTodo]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) return;
    if (editTodo) {
      onUpdateTodo(editTodo.id, newTask);
    } else {
      onAddTodo(newTask);
    }
    setNewTask("");
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #fff",
        borderRadius: "8px",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        background: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
  <h2>{editTodo ? "Edit Todo" : "Tambah Todo Baru"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="task"
          placeholder="Tambahkan tugas baru..."
          value={newTask}
          onChange={handleInputChange}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "none" }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: editTodo ? "orange" : "#61dafb",
              color: "#282c34",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {editTodo ? "Update" : "Tambah"}
          </button>
          {editTodo && (
            <button
              type="button"
              onClick={onCancelEdit}
              style={{
                padding: "10px",
                backgroundColor: "#ccc",
                color: "#282c34",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;