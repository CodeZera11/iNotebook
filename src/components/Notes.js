import React, {useContext, useEffect} from 'react'
import notesContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';

const Notes = () => {
    
  const context = useContext(notesContext)
  const {notes, fetchNotes} = context;

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])
  

  return (
    <div className="row my-5">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note = {note}/>
        })}
    </div>
  )
}

export default Notes