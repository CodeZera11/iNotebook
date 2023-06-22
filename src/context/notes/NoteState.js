import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{

    const n1 = [
        {
          "tag": "General",
          "_id": "6491f9e5ffcf4403c81e1c6e8",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:03.897Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "64919e67fcf4403cf81e1c6ea",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:11.615Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "649dfas19e6afcf4403c81e1c6ec",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:14.408Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "64919e919e746dcfsafa384cb6e8",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:53.499Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "649429e919e746dca384cb6e8",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:53.499Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "649143249e919e746dca384cb6e8",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:53.499Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "64919e919e746d43141ca384cb6e8",
          "user": "64902dafc60ceb112c26bf63",
          "title": "First Note",
          "description": "This is my desc....",
          "tags": "General",
          "date": "2023-06-20T12:41:53.499Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(n1);

    // Add a note
    const addNote = (title, description, tag)=>{
      // console.log("Adding a new note")
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
    const deleteNote = (id)=>{
      // console.log("Deleting note with id " + id)
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    // Edit a note
    const editNote = ()=>{
      
    }
    
    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;