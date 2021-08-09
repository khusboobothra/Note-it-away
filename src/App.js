import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header'
import NotesList from './components/NotesList';
import Search from './components/Search'


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is my first note',
      date: '07/08/2021',
    },
    {
      id: nanoid(),
      text: 'This is my second note',
      date: '08/08/2021',
    },
    {
      id: nanoid(),
      text: 'This is my third note',
      date: '09/08/2021',
    },
    {
      id: nanoid(),
      text: 'This is my fourth note',
      date: '10/08/2021',
    },
    {
      id: nanoid(),
      text: 'This is my fifth note',
      date: '11/08/2021',
    },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote} />
      </div>
    </div>

  );
}

export default App;
