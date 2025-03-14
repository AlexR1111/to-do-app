import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetch("http://localhost:3050/liste_abrufen")
      .then((res) => res.json())
      .then(setTasks)
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []); // Empty dependency array to avoid infinite loop

  // Add a new task
  const itemHinzufuegen = () => {
    fetch("http://localhost:3050/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((neueAufgabe) => setTasks((prevTasks) => [...prevTasks, neueAufgabe]))
      .catch((error) => console.error('Error adding task:', error));

    setTitle(""); // Clear the input field
  };

  // Delete a task
  const itemLoeschen = (id_nummer) => {
    fetch(`http://localhost:3050/delete/${id_nummer}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id_nummer));
        }
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <>
      <h1>To-Do List</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Neue Aufgabe hinzufügen"
      />
      <button disabled={!title.trim()} onClick={itemHinzufuegen}>
        Add
      </button>

      <ul>
        {tasks.map(({ id, title, completed }) => (
          <li key={id}>
            <input
              type="checkbox"
              checked={completed}
              readOnly
            />
            {title}
            <button onClick={() => itemLoeschen(id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
