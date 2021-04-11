import './App.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase'
import db from './Connect'
import TaskList from './TaskList'

function App() {

  const [Task, setTask] = useState([])
  const [Input, setInput] = useState('')

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTask(snapshot.docs.map( doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  function addTask() {

    db.collection('todos').add({
      todo: Input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
    
  } 
 
  return (
    <div className="main-container base">
     
      <header className="app-header base">
        Simply Todo
      </header>
        
      <div className="input-div base">
        <input id="inputbox" className="input-box" type="text" onChange={(event) => setInput(event.target.value)}/>
        <button type="submit" disabled={!Input} onClick={addTask}>Add Task</button>
      </div>

      <div className="task-container base"> 
        {
          Task.map( todo => (
            <TaskList name={todo}/>
          )) 
        }
      </div>
    
    </div>
  );
}

export default App;
