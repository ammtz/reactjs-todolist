import { useState, useEffect, useRef } from "react"
import TodoList from "./components/TodoList"
import TodoInput from "./components/TodoInput"
import Alert from "./components/Alert"

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const alertTimeoutRef = useRef(null);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    if (!newTodo.trim()) {
      setAlertMessage({ text: 'Please enter something before adding!', type: 'error' });
      autoHideAlert(); // Call function to hide alert after 5 seconds
      return;
    }
    setAlertMessage({ text: 'Todo added successfully!', type: 'success' });
    autoHideAlert(); // Call function to hide alert after 5 seconds



    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  
  function handleEditTodo(index) {
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodo(index)
  }

  function autoHideAlert() {
    // take into account current running timers, if any...
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = setTimeout(() => {
      setAlertMessage('');
      alertTimeoutRef.current = null;
    }, 5000);
  }



  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

   }, [])

  
    return (
    <>
      {alertMessage && <Alert message={alertMessage.text} type={alertMessage.type} />}
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </>
  )
}

export default App
