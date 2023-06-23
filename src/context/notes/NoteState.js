import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{

    const host = "http://localhost:8000"

    const n1 = []

    const [notes, setNotes] = useState(n1);

    // Fetch all notes
    const fetchNotes = async ()=>{
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjY0OX0.FaqwDqH_JjquuuAnlQiX_8djBFf0zqyXc7rbVch7DsU"
        }
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag)=>{
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjY0OX0.FaqwDqH_JjquuuAnlQiX_8djBFf0zqyXc7rbVch7DsU"
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      // console.log(json)
      setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        // Changing array in client
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);

        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjY0OX0.FaqwDqH_JjquuuAnlQiX_8djBFf0zqyXc7rbVch7DsU"
          }
        });   
        
        const json = await response.json();
        console.log(json)

        console.log("Deleting note with id " + id)
    }

    // Edit a note
    const editNote = async (id, title, description, tag)=>{

      // Logic to edit notes in client
      let newNotes = await JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index]
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        } 
      }
      console.log(id, notes)
      setNotes(newNotes);

      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjY0OX0.FaqwDqH_JjquuuAnlQiX_8djBFf0zqyXc7rbVch7DsU"
        },
        body: JSON.stringify({title, description, tag})
      });

      const json = await response.json();
      console.log(json);
    }
    
    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;