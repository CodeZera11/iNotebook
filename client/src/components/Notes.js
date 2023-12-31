import React, {useContext, useState, useRef ,useEffect} from 'react'
import notesContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    
  const context = useContext(notesContext)
  const {notes, fetchNotes, editNote} = context;
  const ref = useRef(null)
  const refClose = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      fetchNotes()
    }else{
      navigate('/login')
    }
    
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  })

  const handleClick = (e)=>{
    console.log("Updating the note.... " , note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", 'success')
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    })
}

  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" >Title</label>
                    <input type="text" className="form-control" minLength={5} value={note.etitle} id="etitle" name="etitle" onChange={onChange} aria-describedby="emailHelp" required/>
                    
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" > Description </label>
                    <input type="text" className="form-control" minLength={5} value={note.edescription} id="edescription" name="edescription" onChange={onChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label" > Tag </label>
                    <input type="text" className="form-control" minLength={5} value={note.etag} id="etag" name="etag" onChange={onChange} required/>
                  </div>
                  
                  </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length===0 && "No notes yet"}
        </div>
        {notes.map((note)=>{
            return <Noteitem showAlert={props.showAlert} key={note._id} updateNote = {updateNote} note = {note}/>
        })}
    </div>
    </>
  )
}

export default Notes