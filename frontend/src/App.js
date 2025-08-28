import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const BASE = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${BASE}/api/todos`)
      .then(r => r.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const addTodo = async (text) => {
    const res = await fetch(`${BASE}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) { alert('Add failed'); return; }
    const item = await res.json();
    setTodos(prev => [...prev, item]);
  };


  const deleteTodo = async (id) => {
    const res = await fetch(`${BASE}/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) { 
      const msg = await res.text();
      alert(`Delete failed ${res.status} ${msg}`); 
      return; 
    }
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  return (
  <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
    <h1 style={{
      color: '#0b1f5e', 
      fontFamily: 'cursive', 
      fontWeight: 'bold'
    }}>
      Todo List
    </h1>
    <AddTodoForm onAdd={addTodo} />
    <TodoList todos={todos} onDelete={deleteTodo} />
  </div>
  );

}

export default App;
