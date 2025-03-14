import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetch("http://localhost:3050/liste_abrufen")
    .then((res) => res.json())
    .then(setTasks)
  }, [tasks]);

  const itemHinzufuegen = () => {

  //falls eingabefeld leer ist, mach nicht weiter, siehe button attribute disabled

    fetch("http://localhost:3050/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title}),
    })
    //hier möchte ich dass die liste in der app auch aktualisiert wird
    .then((res) => res.json())
    .then((neueAufgabe) => setTasks([...tasks,neueAufgabe]))

    setTitle("");
  }
  
  const itemLoeschen= (id_nummer) => {
    //console.log("Gedrückte Taste:"+ id_nummer)
    fetch (`http://localhost:3050/delete/${id_nummer}`, {
      method: "DELETE",
    })
    .then((res) => {
      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== id_nummer));
      }
    });
console.log(tasks)
  }

  return (
    <>
      <h1>To-Do List</h1>
      <input value={title}  onChange={(e)=>setTitle(e.target.value)} />
      <button disabled={!title.trim()} onClick={itemHinzufuegen}>Add</button>

      <ul>
        {// hier gehört der Code, um die To-Do Liste dynamisch zu gestalten
        tasks.map(({id, title, completed}) => (
          <li key={id}>
            <input type='checkbox' /> 
            {title}
            <button onClick={() => itemLoeschen(id)}>X</button>
          </li>
        ))
        }
      </ul>
    </>
  )
}

export default App
