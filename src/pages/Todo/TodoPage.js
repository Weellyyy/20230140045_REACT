// src/pages/TodoPage.js

import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null); // todo yang sedang diedit
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
      }, []);

      useEffect(() => {
        const timerId = setTimeout(() => {
          fetchTodos(searchTerm);
        }, 500);
        return () => clearTimeout(timerId);
      }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([
          ...todos,
          { id: data.id, task: data.task, completed: false },
        ]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  // Handler untuk mulai edit
  const handleEditClick = (todo) => {
    setEditTodo(todo);
  };

  // Handler untuk update todo
  const handleUpdateTodo = (id, newTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then((response) => {
        // Jika response kosong, tetap update dengan newTask
        if (response.status === 204) return {};
        return response.json();
      })
      .then((data) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task: (data && data.task) ? data.task : newTask } : todo
          )
        );
        setEditTodo(null);
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          maxWidth: '540px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '36px 24px 32px 24px',
        }}
      >
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            margin: 0,
            color: '#22223b',
            letterSpacing: '1px',
            fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
          }}>
            <span style={{ color: '#4f8cff' }}>Todo</span> List
          </h1>
          <p style={{ color: '#6c757d', margin: '8px 0 24px 0', fontSize: '1.1rem' }}>
            Produktif setiap hari dengan daftar tugas yang rapi dan mudah digunakan.
          </p>
        </header>
        <div style={{ marginBottom: 24 }}>
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <TodoForm
            onAddTodo={handleAddTodo}
            editTodo={editTodo}
            onUpdateTodo={handleUpdateTodo}
            onCancelEdit={() => setEditTodo(null)}
          />
        </div>
        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: 600,
          color: '#22223b',
          marginBottom: 18,
          marginTop: 0,
        }}>
          Daftar Tugas Anda
        </h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditClick}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>
    </div>
  );
};

export default TodoPage;