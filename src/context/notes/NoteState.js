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
      const json =  response.json();

      console.log("Adding a new note")
      let note = {
        "tag": "General",
        "_id": "64919e5ffcf4403c81e1c6e8",
        "user": "64902dafc60ceb112c26bf63",
        "title": title,
        "description": description,
        "tags": tag,
        "date": "2023-06-20T12:41:03.897Z",
        "__v": 0
      }
      setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id)=>{
      // API Call 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjY0OX0.FaqwDqH_JjquuuAnlQiX_8djBFf0zqyXc7rbVch7DsU"
        }
      });    

      // console.log("Deleting note with id " + id)
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    // Edit a note
    const editNote = async (id, title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDJkYWZjNjBjZWIxMTJjMjZiZjYzIn0sImlhdCI6MTY4NzI3MjU2MX0.boUGUpNsIpzKxnC48oTuFRtwt8WpcLGLhjE693AMWqM"
        },
        body: JSON.stringify({title, description, tag})
      });

     const json = response.json();

      // Logic to edit notes in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index]
        if(element._id === id){
          element.title= title;
          element.description= description;
          element.tag= tag
        }
      }
    }
    
    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;