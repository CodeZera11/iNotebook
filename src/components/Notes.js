import React, {useContext,useState, useRef ,useEffect} from 'react'
import notesContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';

const Notes = () => {
    
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "default"
  })

  const handleClick = (e)=>{
    console.log("Updating the note.... " , note)
    e.preventDefault();

  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  const context = useContext(notesContext)
  const {notes, fetchNotes} = context;

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])
  
  const ref = useRef(null)

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({
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
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onChange} aria-describedby="emailHelp"/>
                    
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" > Description </label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label" > Tag </label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}/>
                  </div>
                  
                  </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
    <div className="row my-5">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem key={note._id} updateNote = {updateNote} note = {note}/>
        })}
    </div>
    </>
  )
}

export default Notes