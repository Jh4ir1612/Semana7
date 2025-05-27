import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para las tareas
  const [todos, setTodos] = useState(() => {
    // Intenta cargar desde localStorage al iniciar
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Estado para el input
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Efecto para guardar en localStorage cuando cambian las tareas
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Función para agregar nueva tarea
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  // Función para alternar estado de completado
  const toggleTodo = id => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  // Función para eliminar tarea
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filtrar tareas según el filtro seleccionado
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyPress={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      
      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Pendientes
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button 
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      
      <div className="stats">
        <p>Tareas totales: {todos.length}</p>
        <p>Tareas completadas: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;
