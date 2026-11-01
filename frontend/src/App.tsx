import { useState, useEffect } from 'react'

import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

function App() {
const [todos, setTodos] = useState<Todo[]>(() => {
  const storedTodos = localStorage.getItem('todos')
  return storedTodos ? JSON.parse(storedTodos) : []
})
const [inputText, setInputText] = useState<string>('')
const [filter, setFilter] = useState<Filter>('all')

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])

function AddTodo(){
  if(inputText.trim() !== ''){
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false
    }
    setTodos([...todos, newTodo])
    setInputText('')
  }
}

function ToggleTodo(id: number){
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
function DeleteTodo(id: number){
    setTodos(todos.filter(todo => todo.id !== id))
  }

const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed
  if (filter === 'completed') return todo.completed
  return true
})

return (
  <>
    <h1>Список задач</h1>
    <div className='input-group'>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Что нужно делать'
      />
      <button onClick={AddTodo}>Добавить</button>
    </div>
    <div className='filters-group'>
      
      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Активные</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Выполненные</button>
    </div>
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => ToggleTodo(todo.id)}
          />
          <span className={`todo-text ${todo.completed ? 'todo-completed' : ''}`}>
          {todo.text}
          </span>
          <button className='btn-delete' onClick={() => DeleteTodo(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  </>
)}
export default App
